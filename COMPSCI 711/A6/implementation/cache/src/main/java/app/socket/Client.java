package app.socket;

import app.Driver;
import javafx.application.Platform;
import javafx.collections.ObservableList;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.nio.charset.Charset;


public class Client {
    // Port number for the network
    public static final int NETWORK_PORT = 8081;

    public static void send(ObservableList<String> sent) {
        String msgUUID = String.valueOf(System.currentTimeMillis());

        String broadcast = "<" + msgUUID + "> from Middleware " + Driver.MIDDLEWARE_ID + " Hello World! <EOM>";
        sendToMiddlewares(msgUUID);
        sendToNetwork(broadcast);
        Platform.runLater(() -> sent.add(broadcast));
    }

    private static void sendToMiddlewares(String msgUUID) {
        Thread[] threadPool = new Thread[5];
        for (int i = 0; i < 5; i++) {
            int finalI = i;
            Thread thread = new Thread(() -> sendToMiddleware(finalI + 1, msgUUID));
            threadPool[i] = thread;
            thread.start();
        }
        try {
            for (Thread thread : threadPool) {
                thread.join();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private static void sendToMiddleware(int ID, String msgUUID) {
        int port = ID + 8081;
        try {
            InetAddress serverHost = InetAddress.getLocalHost();

            System.out.println("Attempting to connect to: " + serverHost.getHostAddress() + ":" + port);

            try (Socket socket = new Socket(serverHost, port)) {
                socket.setKeepAlive(true);
                System.out.println("Connected with middleware " + "ID");

                OutputStream outputStream = socket.getOutputStream();
                outputStream.write(msgUUID.getBytes(Charset.forName("UTF-8")));
                outputStream.flush();
            }

        } catch (NumberFormatException | IOException e) {
//            e.printStackTrace();
            System.out.println("Couldn't connect to middleware " + ID);
        }
    }

    private static void sendToNetwork(String msg) {
        try {
            InetAddress serverHost = InetAddress.getLocalHost();

            System.out.println("Attempting to connect to: " + serverHost.getHostAddress() + ":" + NETWORK_PORT);

            try (Socket socket = new Socket(serverHost, NETWORK_PORT)) {
                socket.setKeepAlive(true);
                System.out.println("Connected with network");

                OutputStream outputStream = socket.getOutputStream();
                outputStream.write(msg.getBytes(Charset.forName("UTF-8")));
                outputStream.flush();
            }

        } catch (NumberFormatException | IOException e) {
            e.printStackTrace();
        }

    }


}