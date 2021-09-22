package app.socket;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

public class Server {

    private static Server instance;
    private ObjectOutputStream out;
    private ObjectInputStream in;

    public static Server getServer() {
        if (instance == null) {
            instance = new Server();
        }
        return instance;
    }

    public Server() {

        try (ServerSocket socket = new ServerSocket(3333)) {

            InetAddress serverHost = InetAddress.getLocalHost();
            System.out.println("Server destination: " + serverHost.getHostAddress() + ":" + socket.getLocalPort());

            /* Repeatedly handle requests for processing. */
            while (true) {

                try (Socket clientConnection = socket.accept()) {
                    System.out.println("Client connected!");

                    in = new ObjectInputStream(clientConnection.getInputStream());
                    out = new ObjectOutputStream(clientConnection.getOutputStream());

                    System.out.println("Streams obtained!");

                    // Read request
                    while (true) {
                        String request = (String) in.readObject();
                        readRequest(request);
                    }

                } catch (IOException | ClassNotFoundException e) {
                    e.printStackTrace();
                }

            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void readRequest(String request) throws IOException, ClassNotFoundException {
        if ("FILES".equals(request)) {
//            TODO: Retrieve list of files from server
            System.out.println("Retrieving list of files");
            List<String> files = new ArrayList<>();
            files.add("test.txt");
            files.add("xd.txt");
            out.writeObject(files);
            out.flush();
        } else if ("GET".equals(request)) {
//            TODO: Retrive file from server or cache if exists
            String fileToGet = (String) in.readObject();
            System.out.println(fileToGet);
        }
    }

}