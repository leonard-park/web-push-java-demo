# Java WebPush Demo application

* Java WebPush demo
* https://github.com/web-push-libs/webpush-java used
* Spring Boot is used for creating the backend

## Try it out

* Checkout and run the application
* Visit http://localhost:8080 and then click on subscribe
* Post a notification by using the following command from linux/mac (or a git-bash terminal in Windows):

```
curl -X POST \
  http://localhost:8080/notify-all \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"title": "NaturalProgrammer",
	"message": "NaturalProgmmer.com - where quality matters",
	"clickTarget": "http://www.naturalprogrammer.com"
}'
```

## References

* https://dzone.com/articles/web-push-notifications-1
* https://github.com/web-push-libs/webpush-java
* https://github.com/web-push-libs/webpush-java/wiki/Usage-Example
* https://github.com/web-push-libs/webpush-java/wiki/VAPID
