package dev.leonardpark.demo.webpush.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WebPushMessage implements Serializable {

  public String title;
  public String clickTarget;
  public String message;

  @Override
  public String toString() {
    return "WebPushMessage{" +
        "title='" + title + '\'' +
        ", clickTarget='" + clickTarget + '\'' +
        ", message='" + message + '\'' +
        '}';
  }
}
