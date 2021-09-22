package app.socket;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;


public class Client {
    // Port number for the server
    public static int PORT = 3334;

    public static List<String> getFilesList() {
        try {
            InetAddress serverHost = InetAddress.getLocalHost();

            System.out.println("Attempting to connect to: " + serverHost.getHostAddress() + ":" + PORT);

            try (Socket socket = new Socket(serverHost, PORT)) {
                socket.setKeepAlive(true);
                System.out.println("Connected with server");

                ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream in = new ObjectInputStream(socket.getInputStream());
                out.writeObject("FILES");
                out.flush();
                return (ArrayList<String>) in.readObject();
            }

        } catch (NumberFormatException | IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return new ArrayList<>();
    }

    public static String getFile(String fileName) {
        try {
            InetAddress serverHost = InetAddress.getLocalHost();

            System.out.println("Attempting to connect to: " + serverHost.getHostAddress() + ":" + PORT);

            try (Socket socket = new Socket(serverHost, PORT)) {
                socket.setKeepAlive(true);
                System.out.println("Connected with server");

                ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
                ObjectInputStream in = new ObjectInputStream(socket.getInputStream());
                out.writeObject("GET");
                out.writeObject(fileName);
                out.flush();
                return (String) in.readObject();
            }

        } catch (NumberFormatException | IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return "";
    }


}