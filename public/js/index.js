function resendEmailVerification(user) {
  $.post('/api/v1/user/resend-email-verification', { userId: user.sub });
  alert(`Email verification sent to ${user.email}`);
}
