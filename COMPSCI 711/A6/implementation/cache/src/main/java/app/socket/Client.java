package app.socket;

import app.Driver;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.nio.charset.Charset;


public class Client {
    // Port number for the network
    public static final int PORT = 8081;

    public static void send() {
        try {
            InetAddress serverHost = InetAddress.getLocalHost();

            System.out.println("Attempting to connect to: " + serverHost.getHostAddress() + ":" + PORT);

            try (Socket socket = new Socket(serverHost, PORT)) {
                socket.setKeepAlive(true);
                System.out.println("Connected with server");

                OutputStream outputStream = socket.getOutputStream();
                String string = "Msg #1 from Middleware " + Driver.MIDDLEWARE_ID + " Hello Worldo! <EOM>";
                outputStream.write(string.getBytes(Charset.forName("UTF-8")));
                outputStream.flush();
            }

        } catch (NumberFormatException | IOException e) {
            e.printStackTrace();
        }

    }


}