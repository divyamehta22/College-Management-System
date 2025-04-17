import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const FacialAttendance = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsWithoutFacialData, setStudentsWithoutFacialData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [mode, setMode] = useState('recognize'); // 'recognize' or 'register'
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Check if user is admin or super_admin
  const isAdmin = user && (user.role === 'admin' || user.role === 'super_admin');
  
  useEffect(() => {
    // Fetch today's attendance
    fetchTodayAttendance();
    
    // If admin, fetch students without facial data
    if (isAdmin) {
      fetchStudentsWithoutFacialData();
    }
    
    // Cleanup function to stop camera when component unmounts
    return () => {
      stopCamera();
    };
  }, [isAdmin]);

  const fetchTodayAttendance = async () => {
    try {
      setLoadingAttendance(true);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/facial-recognition/today`, {
        headers: {
            Authorization: `Bearer ${user.token}`,
          },
      });
      setTodayAttendance(response.data.data || []);
    } catch (error) {
      console.error('Error fetching today\'s attendance:', error);
      setError('Failed to load today\'s attendance data');
    } finally {
      setLoadingAttendance(false);
    }
  };

  const fetchStudentsWithoutFacialData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/facial-recognition/without-facial-data`, {
        headers: {
            Authorization: `Bearer ${user.token}`,
          },
      });
      setStudentsWithoutFacialData(response.data || []);
    } catch (error) {
      console.error('Error fetching students without facial data:', error);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check your camera permissions.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame on canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob
    canvas.toBlob((blob) => {
      setCapturedImage(blob);
      
      // Set photo src to show captured image
      if (photoRef.current) {
        photoRef.current.src = URL.createObjectURL(blob);
      }
    }, 'image/jpeg', 0.9);
  };

  const handleRecognize = async () => {
    if (!capturedImage) {
      setError('Please capture an image first');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const formData = new FormData();
      formData.append('image', capturedImage, 'captured_image.jpg');
      
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/facial-recognition/recognize`, formData);
      
      if (response.data.status === 'success') {
        setSuccess(`Attendance marked successfully for student ID: ${response.data.data.student_id}`);
        // Refresh the attendance list
        fetchTodayAttendance();
        // Reset captured image
        setCapturedImage(null);
        if (photoRef.current) {
          photoRef.current.src = '';
        }
      } else {
        setError('Failed to recognize face. Please try again.');
      }
    } catch (error) {
      console.error('Error recognizing face:', error);
      setError(error.response?.data?.message || 'Failed to recognize face');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!capturedImage) {
      setError('Please capture an image first');
      return;
    }
    
    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const formData = new FormData();
      formData.append('image', capturedImage, 'captured_image.jpg');
      formData.append('student_id', selectedStudent);
      
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/facial-recognition/register`, formData, {
        headers: {
            Authorization: `Bearer ${user.token}`,
          },
      });
      
      if (response.data.status === 'success') {
        setSuccess('Facial data registered successfully');
        // Refresh the list of students without facial data
        fetchStudentsWithoutFacialData();
        // Reset captured image and selected student
        setCapturedImage(null);
        setSelectedStudent('');
        if (photoRef.current) {
          photoRef.current.src = '';
        }
      } else {
        setError('Failed to register facial data');
      }
    } catch (error) {
      console.error('Error registering facial data:', error);
      setError(error.response?.data?.message || 'Failed to register facial data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmit = () => {
    if (mode === 'recognize') {
      handleRecognize();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">Facial Recognition Attendance</h1>
          <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
          <p className="mt-4 text-gray-600 text-center max-w-2xl">
            {mode === 'recognize' ? 
              'Mark attendance using facial recognition technology' : 
              'Register student faces for facial recognition attendance'}
          </p>
        </div>
        
        {isAdmin && (
          <div className="mb-10">
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg bg-gray-200 p-1">
                <button
                  className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    mode === 'recognize' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-300'
                  }`}
                  onClick={() => setMode('recognize')}
                >
                  Mark Attendance
                </button>
                <button
                  className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    mode === 'register' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-300'
                  }`}
                  onClick={() => setMode('register')}
                >
                  Register Face
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-indigo-700 text-white px-6 py-4">
                <h2 className="text-xl font-semibold">
                  {mode === 'recognize' ? 'Mark Attendance' : 'Register Student Face'}
                </h2>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  {/* Camera display */}
                  <div className="relative w-full mb-6">
                    <div className={`relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 ${cameraActive ? 'border-green-400' : 'border-gray-200'} ${capturedImage ? 'hidden' : ''}`}>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                      />
                      
                      {!cameraActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                          <p className="mt-2 text-gray-500">Camera inactive</p>
                        </div>
                      )}
                    </div>
                    
                    <div className={`relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-blue-400 ${!capturedImage ? 'hidden' : ''}`}>
                      <img
                        ref={photoRef}
                        className="w-full h-full object-cover"
                        alt="Captured"
                      />
                    </div>
                    
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  
                  {/* Camera controls */}
                  <div className="flex flex-wrap justify-center gap-3 mb-6 w-full">
                    {!cameraActive ? (
                      <button
                        onClick={startCamera}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Start Camera
                      </button>
                    ) : (
                      <button
                        onClick={stopCamera}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Stop Camera
                      </button>
                    )}
                    
                    {cameraActive && (
                      <button
                        onClick={capturePhoto}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Capture Photo
                      </button>
                    )}
                    
                    {capturedImage && (
                      <button
                        onClick={() => {
                          setCapturedImage(null);
                          if (photoRef.current) {
                            photoRef.current.src = '';
                          }
                        }}
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Retake
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Student selection (for registration) */}
                {mode === 'register' && isAdmin && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Student
                    </label>
                    <div className="relative">
                      <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      >
                        <option value="">-- Select Student --</option>
                        {studentsWithoutFacialData.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name} ({student.roll_number}) - {student.department_name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || !capturedImage || (mode === 'register' && !selectedStudent)}
                  className={`w-full py-3 px-4 flex items-center justify-center gap-2 rounded-lg font-semibold text-white shadow-md transition ${
                    loading || !capturedImage || (mode === 'register' && !selectedStudent)
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      {mode === 'recognize' ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          Mark Attendance
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                          </svg>
                          Register Face
                        </>
                      )}
                    </>
                  )}
                </button>
                
                {/* Status messages */}
                {error && (
                  <div className="mt-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p>{error}</p>
                  </div>
                )}
                
                {success && (
                  <div className="mt-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p>{success}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
              <div className="bg-indigo-700 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Today's Attendance</h2>
                <button 
                  onClick={fetchTodayAttendance}
                  className="p-1 rounded-full hover:bg-indigo-600 transition-colors"
                  title="Refresh attendance"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {loadingAttendance ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p className="mt-4 text-gray-500">Loading attendance records...</p>
                  </div>
                ) : todayAttendance.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <p className="mt-4 text-gray-500">No attendance records for today</p>
                    <p className="text-sm text-gray-400">Students who mark attendance will appear here</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Name</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Entry Time</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {todayAttendance.map((student, index) => (
                          <tr 
                            key={student.id} 
                            className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                          >
                            <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 mr-3 flex items-center justify-center">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                                <span>{student.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{student.roll_number}</td>
                            <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{student.department_name}</td>
                            <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {formatDate(student.entry_time)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialAttendance;