package dev.leonardpark.demo.webpush.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.leonardpark.demo.webpush.model.WebPushMessage;
import dev.leonardpark.demo.webpush.model.WebPushSubscription;
import nl.martijndwars.webpush.Encoding;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.jose4j.lang.JoseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
public class WebPushController {
  static Logger log = LoggerFactory.getLogger(WebPushController.class);
  private final Map<String, WebPushSubscription> subscriptions = new HashMap<>();

  @Value("${vapid.subject}")
  private String vapidSubject;

  @Value("${vapid.public.key}")
  private String vapidPublicKey;

  @Value("${vapid.private.key}")
  private String vapidPrivateKey;

  @PostMapping("/subscribe")
  public void subscribe(@RequestBody WebPushSubscription subscription) {
    log.info("subscribe : {}", subscription.toString());
    subscriptions.put(subscription.getNotificationEndPoint(), subscription);
  }

  @PostMapping("/unsubscribe")
  public void unsubscribe(@RequestBody WebPushSubscription subscription) {
    log.info("unsubscribe : {}", subscription.toString());
    subscriptions.remove(subscription.getNotificationEndPoint());
  }

  @PostMapping("/notify-all")
  public WebPushMessage notifyAll(@RequestBody WebPushMessage message) throws GeneralSecurityException, IOException, JoseException, ExecutionException, InterruptedException {

    log.info("notify-all : {}", message.toString());

    for (WebPushSubscription subscription : subscriptions.values()) {

      Notification notification = new Notification(
          subscription.getNotificationEndPoint(),
          subscription.getPublicKey(),
          subscription.getAuth(),
          new ObjectMapper().writeValueAsBytes(message)
      );

      HttpResponse response = new PushService(
          vapidPublicKey,
          vapidPrivateKey,
          vapidSubject
      ).send(
          notification,
          Encoding.AES128GCM
      );

      HttpEntity entity = response.getEntity();

      String responseStr = EntityUtils.toString(entity);
      if (responseStr.length() > 0) {
        log.error(responseStr);
      } else {
        log.info("success");
      }

    }

    return message;
  }
}
