export class ApiScreen{

    static base_url = 'https://ugive2.com/dashboard/';
    static login = 'api/auth/login';
    static me = 'api/auth/me';
    static fund_list = 'api/participant/fund_list'
    static donor_list = 'api/participant/donors_list';
    static dashboard = 'api/participant/dashboard';
    static preview = 'api/participant/preview_fundraiser';
    static get_donorlist = 'api/participant/donors_list';
    static add_donor = 'api/participant/add_donor';
    static del_donor = 'api/participant/delete_donor';
    static Edit_donor = 'api/participant/edit_donor';
    static send_email = 'api/participant/send_email_donors';
    static send_sms = 'api/participant/send_sms_donors';
    static donor_activity = 'api/participant/donor_activity';
    static offline_donation = 'api/participant/add_offline_donation';
    static edit_message = 'api/participant/edit_fundraiser_msg';
    static start = 'api/participant/start';
    static step1 = 'api/participant/step1';
    static add_donorStep3 = 'api/participant/step3_add_donor';
    static bulkdonor = 'api/participant/add_bulk_donor';
    static update_message = 'api/participant/step1_update_message';
    static change_fund = 'api/auth/change_fund';
    static update_profile = 'api/participant/update_profile'
    static device_token = "";
    static access_token = "";
    static fund_detail = 'api/participant/fund_details'
    static change_email_status = 'api/participant/change_email_status'
    static ShareOnSocial = 'api/participant/user';

}