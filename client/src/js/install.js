// const butInstall = document.getElementById("buttonInstall");

// window.addEventListener('beforeinstallprompt', (event) => {
//     console.log('hit')
//     console.log("event" + event)
//     event.preventDefault();
//     // Store the triggered events
//     window.deferredPrompt = event;

//     // Remove the hidden class from the button.
//     butInstall.classList.toggle('hidden', false);
// });

// butInstall.addEventListener('click', async () => {
//     const promptEvent = window.deferredPrompt;
//     // console.log(promptEvent)
//     if (!promptEvent) {
//         return;
//     }

//     // Show prompt
//     promptEvent.prompt();

//     // Reset the deferred prompt variable, it can only be used once.
//     window.deferredPrompt = null;

//   butInstall.classList.toggle('hidden', true);
// });

// window.addEventListener('appinstalled', (event) => {
//     // Clear prompt
//     console.log('install hit')
//     window.deferredPrompt = null;
// }); 

const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update UI notify the user they can install the PWA
    butInstall.hidden = false;
});

//an event handler for the `click` event on the `butInstall` button
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
    }
    // Show the install prompt
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button, it can't be called twice.
    butInstall.hidden = true;

});

// event handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
    // Log install to analytics
    console.log('INSTALL: Success');
    window.deferredPrompt = null;
});
