package app;

import app.socket.Server;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class Driver extends Application {
    public static final int MIDDLEWARE_ID = 4;
    Thread server;

    @Override
    public void start(Stage primaryStage) throws IOException {
        FXMLLoader loader = new FXMLLoader(Driver.class.getResource("/Home.fxml"));
        Parent layout = loader.load();
        Scene scene = new Scene(layout);
        primaryStage.setScene(scene);
        primaryStage.show();
        primaryStage.setTitle("Middleware " + MIDDLEWARE_ID);
    }

    @Override
    public void init() {
        System.out.println("Starting up middleware...");
        server = new Thread(Server::getServer);
        server.start();
    }

    @Override
    public void stop() {
        System.out.println("Stopping middleware...");
        server.stop();
        System.exit(0);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
