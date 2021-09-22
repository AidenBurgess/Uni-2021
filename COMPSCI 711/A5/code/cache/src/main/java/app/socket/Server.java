package app.socket;

import app.cache.FileCache;
import app.logger.Logger;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.time.LocalDateTime;
import java.util.List;

public class Server {
    // Port number for the cache
    public static int PORT = 3333;

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
            retrieveFileList();
        } else if ("GET".equals(request)) {
            String fileToGet = (String) in.readObject();
            Logger.get().add("user request: " + fileToGet + " at " + LocalDateTime.now());
            retrieveFile(fileToGet);
        }
    }

    private void retrieveFileList() throws IOException {
        System.out.println("Retrieving list of files");
        List<String> files = Client.getFilesList();
        out.writeObject(files);
        out.flush();
    }

    private void retrieveFile(String fileName) throws IOException {
        String contents;
        if (FileCache.getInstance().isCached(fileName)) {
            contents = FileCache.getInstance().getContent(fileName);
            Logger.get().add("response: cached " + fileName);

        } else {
            contents = Client.getFile(fileName);
            FileCache.getInstance().addFile(fileName, contents);
            Logger.get().add("response: " + fileName + " downloaded from the server");
        }

        out.writeObject(contents);
        out.flush();
    }

}