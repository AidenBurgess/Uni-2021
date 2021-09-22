package app.socket;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;


public class Client {
    // Port number for the cache
    public static int PORT = 3333;

    private Client instance;
    private Socket socket;
    private OutputStream out;
    private InputStream in;

    public Client getClient() {
        if (instance == null) {
            instance = new Client();
        }
        return instance;
    }

    private Client() {
        try {
            try (ServerSocket serverSocket = new ServerSocket(PORT)) {
                socket = serverSocket.accept();
                out = new ObjectOutputStream(socket.getOutputStream());
                in = new ObjectInputStream(socket.getInputStream());
            }

        } catch (NumberFormatException | IOException e) {
            e.printStackTrace();
        }
    }


}