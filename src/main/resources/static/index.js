async function run() {
  // A service worker must be registered in order to send notifications on iOS
  const registration = await navigator.serviceWorker.register(
    "serviceworker.js",
    {
      scope: "./",
    }
  )

  const sendNotiBtn = document.getElementById("send")
  sendNotiBtn.addEventListener("click", async () => {
    await fetch("/notify-all", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": "NaturalProgrammer",
        "message": "NaturalProgmmer.com - where quality matters",
        "clickTarget": "http://www.naturalprogrammer.com"
      })
    })
  })


  const unsubscribeBtn = document.getElementById("unsubscribe")
  unsubscribeBtn.addEventListener("click", async () => {
    // Triggers popup to request access to send notifications
    const result = await window.Notification.requestPermission()

    // If the user rejects the permission result will be "denied"
    if (result === "granted") {
      const subscription = await registration.pushManager.subscribe({
        applicationServerKey: "BBD2nxRw2H1Sm4gU0kkOG5eHl8xgLbBHYz6N0IHTNOrmTR7pXKg9zZuGZufgxkpGRpCK9TwFKDlLz0tp9Gf5wJo",
        userVisibleOnly: true,
      })

      var endpoint = subscription.endpoint
      var key = subscription.getKey('p256dh')
      var auth = subscription.getKey('auth')

      console.log("endpoint", endpoint)
      console.log("key", key)
      console.log("auth", auth)


      var encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
      var encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(auth)))

      await fetch("/unsubscribe", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(subscription),
        body: JSON.stringify({publicKey: encodedKey, auth: encodedAuth, notificationEndPoint: endpoint})
      })
    }
  })

  const subscribeBtn = document.getElementById("subscribe")
  subscribeBtn.addEventListener("click", async () => {
    // Triggers popup to request access to send notifications
    const result = await window.Notification.requestPermission()

    // If the user rejects the permission result will be "denied"
    if (result === "granted") {
      const subscription = await registration.pushManager.subscribe({
        applicationServerKey: "BBD2nxRw2H1Sm4gU0kkOG5eHl8xgLbBHYz6N0IHTNOrmTR7pXKg9zZuGZufgxkpGRpCK9TwFKDlLz0tp9Gf5wJo",
        userVisibleOnly: true,
      })

      var endpoint = subscription.endpoint
      var key = subscription.getKey('p256dh')
      var auth = subscription.getKey('auth')

      console.log("endpoint", endpoint)
      console.log("key", key)
      console.log("auth", auth)


      var encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
      var encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(auth)))

      await fetch("/subscribe", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(subscription),
        body: JSON.stringify({publicKey: encodedKey, auth: encodedAuth, notificationEndPoint: endpoint})
      })
    }
  })
}

run().then()
