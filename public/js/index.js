function resendEmailVerification(user) {
  console.log(user);
  $.post('/api/user/resend-email-verification', { userId: user.sub });
  alert(`Email verification sent to ${user.email}`);
}
