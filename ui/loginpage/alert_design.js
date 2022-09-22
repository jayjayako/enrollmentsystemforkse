function loadalert(position) {
  Swal.fire({
    title: "You are Login!",
    text: "Welcome Sir/Maam!",
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: "#57CBB4",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      location.replace("../" + position + "/dashboard");
    }
  });
}
