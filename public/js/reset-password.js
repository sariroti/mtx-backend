$(document).ready(function () {
  $('#btn-resetpassword').click(function () {
    const user = JSON.parse($('#input-user').val());

    $.post(
      '/api/v1/profile/reset-password',
      { sub: user.sub },
      function (response) {
        $('#ticket-resetpassword').attr('href', response.payload.ticket);
      }
    );
  });
});
