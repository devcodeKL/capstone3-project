import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/users/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });
      console.log('Reset password request sent');

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password reset successfully',
        });
        setPassword('');
        setConfirmPassword('');
        console.log('Password reset successfully');

      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorData.message || 'An error occurred. Please try again.',
        });
        console.log('Error resetting password:', errorData.message);
        
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again.',
      });
      console.error(error);
    }
  };

  return (
    <div className="PasswordContainer">
      <h2 className='ResetPasswordTitle my-4'>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        
        <button type="submit" className="ResetPasswordBtn btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;