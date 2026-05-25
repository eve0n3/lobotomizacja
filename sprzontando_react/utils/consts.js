export const ADDRESS = "http://localhost/"; // tu jak paweł zmienisz na adres serwera to powinno ładnie zadziałać dla wszystkich poniższych
export const LOGIN_URL = `${ADDRESS}lobotomizacja/phpscripts/login.php`;
export const REGISTER_URL = `${ADDRESS}lobotomizacja/phpscripts/register.php`;
export const OFFERS_URL = `${ADDRESS}lobotomizacja/phpscripts/offers.php`;
export const USERS_RANKING_URL = `${ADDRESS}lobotomizacja/phpscripts/users_ranking.php`;
export const VERFY_USER_URL = `${ADDRESS}lobotomizacja/phpscripts/register_code.php`;
export const ADD_OFFER_URL = `${ADDRESS}lobotomizacja/phpscripts/ogloszenie.php`;
export const EDIT_OFFER_URL = `${ADDRESS}lobotomizacja/phpscripts/offers_editing.php`;
export const APPLY_FOR_OFFER_URL = `${ADDRESS}lobotomizacja/phpscripts/ogloszenie_chetny_add.php`;
export const USER_APPLIED_OFFERS_URL = `${ADDRESS}lobotomizacja/phpscripts/ogloszenie_chetny_show.php`;
export const USER_INFO_URL = `${ADDRESS}lobotomizacja/phpscripts/user_info.php`;
export const USER_OFFERS_URL = `${ADDRESS}lobotomizacja/phpscripts/user_offers.php`;
export const USER_OFFERS_APPLICATIONS_URL = `${ADDRESS}lobotomizacja/phpscripts/ogloszenie_chetny_show.php`;
export const REPORTED_OFFERS_URL = `${ADDRESS}lobotomizacja/phpscripts/admin/ogloszenia.php`;
export const BAN_OFFER_URL = `${ADDRESS}lobotomizacja/phpscripts/admin/toggle_ban_ogl.php`;
export const OK_OFFER_URL = `${ADDRESS}lobotomizacja/phpscripts/admin/pardon_ogl.php`;
export const CHANGE_USER_INFO_URL = `${ADDRESS}lobotomizacja/phpscripts/username_email_change.php`;
export const CHOSE_USER_URL = `${ADDRESS}lobotomizacja/phpscripts/ogloszenie_wybrany_add.php`;
export const RESET_PASSWORD_EMAIL_URL = `${ADDRESS}lobotomizacja/phpscripts/passwd_reset.php`;
export const RESET_PASSWORD_VERIFY_URL = `${ADDRESS}lobotomizacja/phpscripts/passwd_check.php`;
export const REPORT_OFFER_URL = `${ADDRESS}lobotomizacja/phpscripts/report.php`;
export const END_OFFER_URL = `${ADDRESS}lobotomizacja/phpscripts/offer_end.php`;
export const SET_OFFER_RATING_URL = `${ADDRESS}lobotomizacja/phpscripts/rating.php`;
export const ADMIN_USERS_URL = `${ADDRESS}lobotomizacja/phpscripts/admin/users.php`;
export const BAN_USER_URL = `${ADDRESS}lobotomizacja/phpscripts/admin/ban_uz.php`;
export const UNBAN_USER_URL = `${ADDRESS}lobotomizacja/phpscripts/admin/unban_user.php`;




export const OF_CITY = "miasto";
export const OF_MIN_PRICE = "minCena";
export const OF_MAX_PRICE = "maxCena";
export const OF_PRICE = "cena";
export const OF_TYPE = "kategoria";
export const OF_DATE = "waznosc";
export const OF_TITLE = "tytul";
export const OF_DESCRIPTION = "opis";
export const OF_ADRESS = "adres";
export const OF_ID = "id";
export const OF_CREATOR_ID = "id_zglasz";
export const OF_RATING = "ocena";
export const OF_RATING_DESCRIPTION = "ocena_opis";
export const OF_ENDED = "zakonczone";
//admin offers
export const ROF_COUNT = "report_count";

//applied offers
export const AP_USER_ID = "id_chetnego";
export const AP_OFFER_ID = "id_ogloszenia";
export const AP_CHOSEN_USER = "wybrany";

//user info
export const US_ID = "id";
export const US_USERNAME = "nazwa";
export const US_EMAIL = "email";
export const US_RATING = "avgocena";
export const US_LAST_OFFER = "ostatnie_zlecenie";
//modes
export const ACTIVE = "active";
export const APPLIED = "applied";
export const BANNED = "banned";
export const ENDED = "ended";
export const IN_PROGRESS = "inProgress";

//navigacja podstrony

export const LOGIN_LOCATION = "/login";
export const LOGIN_RESET_LOCATION = "/login/passwordReset";
export const REGISTER_LOCATION = "/register";
export const SUCCESS_REGISTER_LOCATION = "/successRegister";
export const SUCCESS_VERIFICATION_LOCATION = "/successVerification";
export const HOME_LOCATION = "/";
export const USERS_RANKING_LOCATION = "/usersRanking";
export const ADD_OFFER_LOCATION = "/addOffer";
export const EDIT_OFFER_LOCATION = "/editOffer";
export const MY_OFFERS_LOCATION = "/myOffers";
export const MY_APPLICATIONS_LOCATION = "/myOffersApplications";
export const USER_PROFILE_LOCATION = "/userProfile";
export const OTHER_USER_PROFILE_LOCATION = "/OtherUserProfile";
export const REPORTED_OFFERS_LOCATION = "/reportedOffers";
export const ADMIN_USERS_LOCATION = "/adminUsers";

// feczowanko z bazy
export const MAX_RETRIES_COUNT = 3;
export const SUCCESS_PASSWORD_RESET_LOCATION = "/successPasswordReset";


