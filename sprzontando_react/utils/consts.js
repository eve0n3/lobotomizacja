export const LOGIN_URL = "http://localhost/lobotomizacja/phpscripts/login.php";
export const REGISTER_URL =
  "http://localhost/lobotomizacja/phpscripts/register.php";
export const OFFERS_URL =
  "http://localhost/lobotomizacja/phpscripts/offers.php";
export const USERS_RANKING_URL =
  "http://localhost/lobotomizacja/phpscripts/users_ranking.php";
export const VERFY_USER_URL =
  "http://localhost/lobotomizacja/phpscripts/register_code.php";
export const ADD_OFFER_URL =
  "http://localhost/lobotomizacja/phpscripts/ogloszenie.php";
export const EDIT_OFFER_URL =
  "http://localhost/lobotomizacja/phpscripts/offers_editing.php";
export const APPLY_FOR_OFFER_URL =
  "http://localhost/lobotomizacja/phpscripts/ogloszenie_chetny_add.php";
export const USER_APPLIED_OFFERS_URL =
  "http://localhost/lobotomizacja/phpscripts/ogloszenie_chetny_show.php";
export const USER_INFO_URL =
  "http://localhost/lobotomizacja/phpscripts/user_info.php";
export const USER_OFFERS_URL =
  "http://localhost/lobotomizacja/phpscripts/user_offers.php";
export const REPORTED_OFFERS_URL =
  "http://localhost/lobotomizacja/phpscripts/admin/ogloszenia.php";
export const BAN_OFFER_URL =
  "http://localhost/lobotomizacja/phpscripts/admin/toggle_ban_ogl.php";
export const OK_OFFER_URL =
  "http://localhost/lobotomizacja/phpscripts/admin/pardon_ogl.php";
export const CHANGE_USER_INFO_URL =
  "http://localhost/lobotomizacja/phpscripts/username_email_change.php";
export const CHOSE_USER_URL =
  "http://localhost/lobotomizacja/phpscripts/ogloszenie_wybrany_add.php";
export const RESET_PASSWORD_EMAIL_URL =
  "http://localhost/lobotomizacja/phpscripts/passwd_reset.php";
export const RESET_PASSWORD_VERIFY_URL =
  "http://localhost/lobotomizacja/phpscripts/passwd_check.php";
export const REPORT_OFFER_URL =
  "http://localhost/lobotomizacja/phpscripts/report.php";
export const ADMIN_USERS_URL =
  "http://localhost/lobotomizacja/phpscripts/admin/users.php";
export const BAN_USER_URL =
  "http://localhost/lobotomizacja/phpscripts/admin/ban_uz.php";

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
export const USER_PROFILE_LOCATION = "/userProfile";
export const OTHER_USER_PROFILE_LOCATION = "/OtherUserProfile";
export const REPORTED_OFFERS_LOCATION = "/reportedOffers";
export const ADMIN_USERS_LOCATION = "/adminUsers";

// feczowanko z bazy
export const MAX_RETRIES_COUNT = 3;
export const SUCCESS_PASSWORD_RESET_LOCATION = "/successPasswordReset";
