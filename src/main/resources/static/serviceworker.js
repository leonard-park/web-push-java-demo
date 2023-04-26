self.addEventListener("push", async (event) => {
  const {title, body} = await event.data.json()
  console.log(title, body)
  await self.registration.showNotification(title, {
    body,
  })
})
