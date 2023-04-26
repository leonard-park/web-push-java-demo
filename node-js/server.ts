const express = require("express")
const webpush = require("web-push")
const r = require("dotenv").config()
if (r.error) console.error("dotenv error: " + r.err)

const app = express()

app.use(express.json())

let subscriptionData = null

if (process.env.GCM_API_KEY) webpush.setGCMAPIKey(process.env.GCM_API_KEY)
webpush.setVapidDetails(
  `mailto:${process.env.VAPID_MAILTO}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

app.get("/send-notification", (req, res) => {

  let payload = JSON.stringify({
    title: "Hello World",
    body: "Notification sent from backend"
  })

  let options = null

  let requestDetails
  try {
    requestDetails = webpush.generateRequestDetails(subscriptionData, payload, options)
  } catch (err) {
    return Promise.reject(err)
  }

  console.log("requestDetails", requestDetails)

  webpush.sendNotification(subscriptionData, payload)
  res.sendStatus(200)
})

app.post("/save-subscription", async (req, res) => {
  subscriptionData = req.body
  console.log("subscriptionData", subscriptionData)
  res.sendStatus(200)
})

app.use(express.static("./public"))

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Admin Started On http://localhost:${process.env.PORT}`)
})
