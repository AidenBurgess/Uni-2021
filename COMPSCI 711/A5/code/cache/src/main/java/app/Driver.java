package app;

import app.socket.Server;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class Driver extends Application {
    Thread server;

    @Override
    public void start(Stage primaryStage) throws IOException {
        FXMLLoader loader = new FXMLLoader(Driver.class.getResource("/Home.fxml"));
        Parent layout = loader.load();
        Scene scene = new Scene(layout);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    @Override
    public void init() {
        System.out.println("Starting up cache...");
        new Thread(Server::getServer).start();
    }

    @Override
    public void stop() {
        System.out.println("Stopping cache...");
        server.stop();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
