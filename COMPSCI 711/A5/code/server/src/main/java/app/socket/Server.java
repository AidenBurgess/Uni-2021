package app.socket;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Server {
    // Port number for the server
    public static int PORT = 3334;

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

        try (ServerSocket socket = new ServerSocket(PORT)) {

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
            System.out.println("Retrieving list of files");
            List<String> files = getFileList();
            out.writeObject(files);
            out.flush();
        } else if ("GET".equals(request)) {
            String fileToGet = (String) in.readObject();
            System.out.println("Retrieving " + fileToGet);
            String content = getFile(fileToGet);
            out.writeObject(content);
            out.flush();
        }
    }

    private List<String> getFileList() {
        try {
            return Files.walk(Paths.get("storage"))
              .filter(Files::isRegularFile)
              .map(Path::getFileName)
              .map(Path::toString)
              .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    private String getFile(String file) {
        try {
            return new String(Files.readAllBytes(Paths.get("storage/" + file)), StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

}