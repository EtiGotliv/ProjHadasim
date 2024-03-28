import java.util.Optional;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextInputDialog;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class TheTwitterTowerController {

	@FXML
	private Button Exit;

	@FXML
	private Button SquareTower;

	@FXML
	private Button TriangleTower;

	private double width = 0;
	private double height = 0;

	/*public void initialize() {

	}*/

	@FXML
	void handleExitButtonAction(ActionEvent event) {
		Platform.exit();
	}

	@FXML
	void handleSquareTowerButtonAction(ActionEvent event) {
		dialog();//A call to enter length and width
		if((Math.abs(getWidth() - getHeight())) > 5 || getWidth() == getHeight()) {
			double area = getWidth() * getHeight();
			System.out.println("The area of the square is: "  +  area);
		} else {
			double perimeter = 2 * getWidth() + 2 * getHeight();
			System.out.println("The perimeter of the square is: "  +  perimeter);
		}
	}

	@FXML
	void handleTriangleTowerButtonAction(ActionEvent event) {
		dialog();//A call to enter length and width.
		Stage secondaryStage = new Stage();//Creating a new Stage to insert the two new options.
		secondaryStage.setWidth(500); // Set your desired width
		secondaryStage.setHeight(500); // Set your desired height
		secondaryStage.setTitle("Triangle Tower");
		
		// Create buttons for perimeter calculation and triangle printing
		Button perimeterButton = new Button("Perimeter Calculation");
		perimeterButton.setMinSize(150, 150);
		perimeterButton.setOnAction(e -> {
			calculatePerimeter();
			secondaryStage.close();
		});
		
		// Create buttons for triangle printing
		Button triangleButton = new Button("Triangle Printing");
		triangleButton.setMinSize(150, 150);
		triangleButton.setOnAction(e ->{
			printTriangle();
			secondaryStage.close();
		});
		
		// Add buttons to a VBox
		VBox vbox = new VBox(40);
		vbox.setAlignment(Pos.CENTER);
		vbox.getChildren().addAll(perimeterButton, triangleButton);

		// Set VBox as the root of the scene
		secondaryStage.setScene(new Scene(vbox));
		secondaryStage.show();
	}

	private double getHeight() {
		return height;
	}

	private double getWidth() {
		return width;
	}

	private void setWidth(double width) {
		this.width = width;
	}

	private void setHeight(double height) {
		if(height >= 2)
			this.height = height;
	}

	private void calculatePerimeter() {
		double sideLength = Math.sqrt(Math.pow(getWidth()/ 2, 2) + Math.pow(getHeight(), 2));
		double perimeter = getWidth() + 2*sideLength;
		System.out.println("The perimeter of the square is: "  +  perimeter);
	}

	private void printTriangle() {
		if(getWidth() % 2 == 0 || getWidth() > 2*getHeight()) {
			System.out.println("Unable to print.");
		} else if(getWidth() % 2 == 1 || getWidth() < 2*getHeight()) {
			if(getWidth() == 3 || getWidth() == 1 ) {
				System.out.println("Between three and one there are no odd numbers so it is problematic to make such a triangle.");
			}else {
				int numOFoddNumbers = (int) ((getWidth()-2)/2);
				int numOfLinesPerAsterisk = (int) ((getHeight()-2)/numOFoddNumbers);
				int moreLinesForTheTopAsterisk = (int) ((getHeight()-2)%numOFoddNumbers);
				printAsterisksTringle(numOfLinesPerAsterisk,moreLinesForTheTopAsterisk);
			}
		}
	}

	private void printAsterisksTringle(int numOfLinesPerAsterisk,int moreLinesForTheTopAsterisk) {
		int oddNumber = 1; //Variable for odd jumps
		int moreLinesForTheTop = moreLinesForTheTopAsterisk;//variable for additional rows to the top group
		for (int i = 1; i <= getHeight(); i++) {
			if(oddNumber == 1) {
				printSpaces((int) ((getWidth() - oddNumber) / 2));
				printAsterisks(oddNumber);
				oddNumber += 2;
			}
			if(moreLinesForTheTop!=0) {//Print more top lines
				for (int j = 1; j <= moreLinesForTheTop; j++) {
					printSpaces((int) ((getWidth() - oddNumber) / 2));
					printAsterisks(oddNumber);
				}
				i += moreLinesForTheTopAsterisk;
				moreLinesForTheTop = 0;
			}
			for (int j = 1; j <= numOfLinesPerAsterisk; j++) {
				printSpaces((int) ((getWidth() - oddNumber) / 2));
				printAsterisks(oddNumber);
				i++;
			}
			oddNumber += 2;
			if(oddNumber == getWidth()) {
				printAsterisks(oddNumber); 
				break;
			}
		}
		//int spaces = (int) ((getWidth() - oddNumber) / 2);
		/*for (int i = 1; i <= getHeight(); i++) {
			//if(oddNumber == 1) {
				printSpaces((int) ((getWidth() - oddNumber) / 2));
				printAsterisks(oddNumber);
			} else
				if(oddNumber == getWidth()) {
				printAsterisks(oddNumber); 
				break; // Exit the loop
			} else if(moreLinesForTheTopAsterisk != 0) {
				printSpaces((int) ((getWidth() - oddNumber) / 2));
				printAsterisks(oddNumber);
				oddNumber -= 2;
				moreLinesForTheTopAsterisk--;
			}else if(moreLinesForTheTopAsterisk != 0) {
				oddNumber += 2;
			}else {
				printSpaces((int) ((getWidth() - oddNumber) / 2));
				printAsterisks(oddNumber);
				oddNumber += 2;
			}
		}*/
	}

	private void printAsterisks(int num) {
		for (int i = 0; i < num; i++) {
			System.out.print("*");
		}
		System.out.println(); // Move to the next line after printing asterisks
	}

	private static void printSpaces(int num) {
		for (int i = 0; i < num; i++) {
			System.out.print(" ");
		}
	}

	private void dialog() {
		/*boolean isValidEnter = false;

		while(!isValidEnter) {
			TextInputDialog dialog = new TextInputDialog();
			dialog.setTitle("Square Tower");
			dialog.setHeaderText(null);
			dialog.setContentText("Please enter the width :");
			Optional<String> result = dialog.showAndWait();
			if (result.isPresent()) {
				String input = result.get();
				if (isValidNumber(input)) {
					setWidth(Double.parseDouble(result.get()));
					isValidEnter = true;
				} else {
					showErrorAlert("Invalid Input", "Please enter a valid number for width!");
				}
				//double width = Double.parseDouble(result.get());
				//setWidth(Double.parseDouble(result.get()));
				System.out.println("Area of the square tower: "  +  getWidth());
			}     
		}
		isValidEnter = false;*/
		
		//Getting width and height by dialog box and updating them.
		getHeigthAndWidth("Please enter the width :","Please enter a valid number for width!","width");
		getHeigthAndWidth("Please enter the height :","Please enter a valid number for height!","height");
		/*while(!isValidEnter) {
			TextInputDialog dialog = new TextInputDialog();
			dialog.setTitle("Square Tower");
			dialog.setHeaderText(null);
			dialog.setContentText("Please enter the height :");
			Optional<String> result = dialog.showAndWait();
			if (result.isPresent()) {
				String input = result.get();
				if (isValidNumber(input)) {
					setHeight(Double.parseDouble(result.get()));
					isValidEnter = true;
				} else {
					showErrorAlert("Invalid Input", "Please enter a valid number for width!");
				}
				//double height = Double.parseDouble(result.get());
				//setHeight(Double.parseDouble(result.get()));
				System.out.println("Area of the square tower: " + getHeight());
			}
		}*/
	}

	private void getHeigthAndWidth(String heigthOrWidth, String error,String type) {
		boolean isValidEnter = false;//A variable that will cause a dialog box to continue to be hunted so that the input is invalid as soon as it is valid it is changed to true
		while(!isValidEnter) {
			TextInputDialog dialog = new TextInputDialog();
			dialog.setTitle("Square Tower");
			dialog.setHeaderText(null);
			dialog.setContentText(heigthOrWidth);
			Optional<String> result = dialog.showAndWait();
			if (result.isPresent()) {
				String input = result.get();
				if (isValidNumber(input)) {//Enter proper input and therefore update the width or height
					if("height".equals(type)) {
						setHeight(Double.parseDouble(result.get()));
						System.out.println("Height set to: " + getHeight());
					}
					else if("width".equals(type)) {
						setWidth(Double.parseDouble(result.get()));
						System.out.println("Width set to: " + getWidth());
					}
					isValidEnter = true;
				} else {
					showErrorAlert("Invalid Input", error);
				}
			}
		}

	}

	private boolean isValidNumber(String input) {//Checking if a number was entered and not something else
		boolean isNumber = input.matches("-?\\d+(\\.\\d+)?");
		if(isNumber) return true;
		return false;
	}

	private void showErrorAlert(String error, String message) { //Alert that something else has been inserted to a height or width that does not count
		Alert alert = new Alert(Alert.AlertType.ERROR);
		alert.setTitle(error);
		alert.setHeaderText(null);
		alert.setContentText(message);
		alert.showAndWait();
	}
}
