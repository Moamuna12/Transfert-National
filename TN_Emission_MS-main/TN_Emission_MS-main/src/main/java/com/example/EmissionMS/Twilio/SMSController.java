package com.example.EmissionMS.Twilio;

import java.util.List;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.http.HttpStatus;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.twilio.Twilio;


import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
public class SMSController {


    @Value("+12016902618")
    private String myTwilioPhoneNumber;

    @Autowired
    public SMSController(
            @Value("AC997de7b1c8c48e76efc1dca19111dac2") String twilioAccountSid,
            @Value("9c7c7788b5643dd0ee492c5f7013e800") String twilioAuthToken) {
        Twilio.init(twilioAccountSid, twilioAuthToken);
    }

    @PostMapping("/send-messages")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public static void sendMessages(String num,String  msg) {
        System.out.println("details :"+msg);
        Message message = Message.creator(
                new PhoneNumber("+212"+num),"MG50417ddbd6e495748f28f99a24017e71",
                msg).create();
        System.out.println("Sent message w/ sid: " + message.getSid());

    }
}
