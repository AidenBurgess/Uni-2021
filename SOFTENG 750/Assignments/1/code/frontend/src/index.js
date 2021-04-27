import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppContextProvider } from "./AppContextProvider";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import dayjs from "dayjs";
import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { BrowserRouter } from "react-router-dom";

const relativeTime = require("dayjs/plugin/relativeTime");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

ReactDOM.render(
	<MuiPickersUtilsProvider utils={DayjsUtils}>
		<BrowserRouter>
			<AppContextProvider>
				<Auth0ProviderWithHistory>
					<App />
				</Auth0ProviderWithHistory>
			</AppContextProvider>
		</BrowserRouter>
	</MuiPickersUtilsProvider>,
	document.getElementById("root")
);

// Change to "register()" to enable service workers (production only)
serviceWorkerRegistration.unregister();
