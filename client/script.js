var play_button = document.getElementById('play_button');

play_button.addEventListener('click', play);

function play(event) {
    event.preventDefault();
    console.log('play');
}

window.onloadTurnstileCallback = function () {
    turnstile.render("#example-container", {
      sitekey: "<0x4AAAAAAA48Fql_S9df_Luo>",
      callback: function (token) {
        console.log(`Challenge Success ${token}`);
      },
    });
  };
