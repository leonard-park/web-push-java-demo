package dev.leonardpark.demo.webpush.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WebPushSubscription {
  private String notificationEndPoint;
  private String publicKey;
  private String auth;

  @Override
  public String toString() {
    return "WebPushSubscription{" +
        "notificationEndPoint='" + notificationEndPoint + '\'' +
        ", publicKey='" + publicKey + '\'' +
        ", auth='" + auth + '\'' +
        '}';
  }
}
