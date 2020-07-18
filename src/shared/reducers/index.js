import {combineReducers} from 'redux';
//import DiagnosisReducer from "./DiagnosisReducer";
import people from "./people";
import Allergies from "./Allergies";
import Medication from "./Medications";
import Resources from "./Resources";
import Token from "./Token";
import Profile from "./Profile";
import Reports from "./Reports";
import Timeline from "./Timeline";
import Immune from "./Immune";
import Messaging from "./Messaging";
import BookApp from "./BookApp";
import AddAppointment from "./AddAppointment";
import Recp from "./Recp";
import LongDiag from "./LongDiag";
import FutureAppointments from "./FutureAppointments";
import CompletedAppointment from "./CompletedAppointment";
import MissedAppointments from "./MissedAppointments";
import CancelledAppointments from "./CancelledAppointments";
import SentItems from "./SentItems";
import PendingInvc from "./PendingInvc";
const rootReducer = combineReducers({
    people,
    Allergies,
    Medication,
    Resources,
    Token,
    Profile,
    Reports,
    Timeline,
    Immune,
    Messaging,
    BookApp,
    AddAppointment,
    Recp,
    LongDiag,
    FutureAppointments,
    CompletedAppointment,
    MissedAppointments,
    CancelledAppointments,
    SentItems,
    PendingInvc
});

export default rootReducer;