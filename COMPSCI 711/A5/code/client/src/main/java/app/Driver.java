package app;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class Driver extends Application {
    @Override
    public void start(Stage primaryStage) throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(this.getClass().getResource("Home.fxml"));
        Parent layout = loader.load();
        Scene scene = new Scene(layout);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void init() {
        System.out.println("Starting up client...");

    }

    public void stop() {
        System.out.println("Stopping client...");
    }

    public static void main(String[] args) {
        launch(args);
    }
}
