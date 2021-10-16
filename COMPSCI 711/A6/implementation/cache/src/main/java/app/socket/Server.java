package app.socket;

import app.Driver;
import app.data.Received;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

public class Server {
    // Port number for the middleware
    public static final int PORT = 8081 + Driver.MIDDLEWARE_ID;

    private static Server instance;
    private ObjectOutputStream out;

    public static Server getServer() {
        if (instance == null) {
            instance = new Server();
        }
        return instance;
    }

    public Server() {

        try (ServerSocket socket = new ServerSocket(PORT)) {

            InetAddress serverHost = InetAddress.getLocalHost();
            System.out.println("Server destination: " + serverHost.getHostAddress() + ":" + socket.getLocalPort());

            /* Repeatedly handle requests for processing. */
            while (true) {

                try (Socket clientConnection = socket.accept()) {
                    System.out.println("Client connected!");

                    InputStream inputStream = clientConnection.getInputStream();

                    // Read in message
                    String text = new BufferedReader(
                      new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                      .lines()
                      .collect(Collectors.joining("\n"));
                    // Add to state
                    Received.get().add(text);
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}