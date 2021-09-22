package app.socket;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;


public class Client {
    // Port number for the cache
    public static int PORT = 3333;

    private static ObjectOutputStream out;
    private static ObjectInputStream in;

    private static void createClient() {

    }

    public static List<String> getFilesList() {
        try {
            InetAddress serverHost = InetAddress.getLocalHost();

            System.out.println("Attempting to connect to: " + serverHost.getHostAddress() + ":" + PORT);

            try (Socket socket = new Socket(serverHost, PORT)) {
                socket.setKeepAlive(true);
                System.out.println("Connected with cache");

                out = new ObjectOutputStream(socket.getOutputStream());
                in = new ObjectInputStream(socket.getInputStream());
                out.writeObject("FILES");
                out.flush();
                ArrayList<String> received = (ArrayList<String>) in.readObject();
                return received;
            }

        } catch (NumberFormatException | IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return new ArrayList<>();
    }


}