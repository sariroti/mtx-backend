function saveProfile() {
  const name = $('#user-name').val();

  $.ajax({
    url: '/api/v1/profile',
    type: 'PUT',
    data: { name },
    success: function (response) {
      console.log(response);
    },
  });

  alert('saved');
}
