terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "1.2.0"
    }
  }
}

provider "auth0" {
  # Configuration options https://registry.terraform.io/providers/auth0/auth0/latest/docs
}

# __generated__ by Terraform
# Please review these resources and move them into your main configuration files.

# __generated__ by Terraform from "signup-password::en"
resource "auth0_prompt_custom_text" "en_signup_password" {
  body     = "{}"
  language = "en"
  prompt   = "signup-password"
}

# __generated__ by Terraform from "mfa::en"
resource "auth0_prompt_custom_text" "en_mfa" {
  body     = "{}"
  language = "en"
  prompt   = "mfa"
}

# __generated__ by Terraform from "signup::en"
resource "auth0_prompt_custom_text" "en_signup" {
  body     = "{}"
  language = "en"
  prompt   = "signup"
}

# __generated__ by Terraform from "a6761edd-550b-45fa-8df8-370a9a4fa292"
resource "auth0_tenant" "tenant" {
  allow_organization_name_in_authentication_api = false
  allowed_logout_urls                           = []
  customize_mfa_in_postlogin_action             = false
  default_audience                              = null
  default_directory                             = null
  default_redirection_uri                       = null
  enabled_locales                               = ["en"]
  friendly_name                                 = null
  idle_session_lifetime                         = 72
  picture_url                                   = null
  sandbox_version                               = "18"
  session_lifetime                              = 168
  support_email                                 = null
  support_url                                   = null
  flags {
    allow_legacy_delegation_grant_types    = false
    allow_legacy_ro_grant_types            = false
    allow_legacy_tokeninfo_endpoint        = false
    dashboard_insights_view                = false
    dashboard_log_streams_next             = false
    disable_clickjack_protection_headers   = false
    disable_fields_map_fix                 = false
    disable_management_api_sms_obfuscation = false
    enable_adfs_waad_email_verification    = false
    enable_apis_section                    = false
    enable_client_connections              = false
    enable_custom_domain_in_emails         = false
    enable_dynamic_client_registration     = false
    enable_idtoken_api2                    = false
    enable_legacy_logs_search_v2           = false
    enable_legacy_profile                  = false
    enable_pipeline2                       = false
    enable_public_signup_user_exists_error = false
    mfa_show_factor_list_on_enrollment     = false
    no_disclose_enterprise_connections     = false
    require_pushed_authorization_requests  = false
    revoke_refresh_token_grant             = false
    use_scope_descriptions_for_consent     = false
  }
  session_cookie {
    mode = null
  }
  sessions {
    oidc_logout_prompt_enabled = false
  }
}

# __generated__ by Terraform from "login-password::en"
resource "auth0_prompt_custom_text" "en_login_password" {
  body     = "{}"
  language = "en"
  prompt   = "login-password"
}

# __generated__ by Terraform from "consent::en"
resource "auth0_prompt_custom_text" "en_consent" {
  body     = "{}"
  language = "en"
  prompt   = "consent"
}

# __generated__ by Terraform from "2aadb974-a506-4884-a34d-15f688a20a59"
resource "auth0_prompt" "prompts" {
  identifier_first               = true
  universal_login_experience     = "new"
  webauthn_platform_first_factor = false
}

# __generated__ by Terraform from "dJG0l3oOj9S8jE33zcrkVDhiLpzB25Ta"
resource "auth0_client" "dedicated_auth0_m2m" {
  allowed_clients                       = []
  allowed_logout_urls                   = []
  allowed_origins                       = []
  app_type                              = "non_interactive"
  callbacks                             = []
  client_aliases                        = []
  client_metadata                       = {}
  cross_origin_auth                     = false
  cross_origin_loc                      = null
  custom_login_page                     = null
  custom_login_page_on                  = true
  description                           = "terraform TF m2m application"
  form_template                         = null
  grant_types                           = ["client_credentials"]
  initiate_login_uri                    = null
  is_first_party                        = true
  is_token_endpoint_ip_header_trusted   = false
  logo_uri                              = null
  name                                  = "Dedicated Auth0 M2M "
  organization_require_behavior         = null
  organization_usage                    = null
  require_pushed_authorization_requests = false
  sso                                   = false
  sso_disabled                          = false
  web_origins                           = []
  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
  native_social_login {
    apple {
      enabled = false
    }
    facebook {
      enabled = false
    }
  }
  refresh_token {
    expiration_type              = "non-expiring"
    idle_token_lifetime          = 2592000
    infinite_idle_token_lifetime = true
    infinite_token_lifetime      = true
    leeway                       = 0
    rotation_type                = "non-rotating"
    token_lifetime               = 31557600
  }
}

# __generated__ by Terraform from "mfa-otp::en"
resource "auth0_prompt_custom_text" "en_mfa_otp" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-otp"
}

# __generated__ by Terraform from "login-id::en"
resource "auth0_prompt_custom_text" "en_login_id" {
  body     = "{}"
  language = "en"
  prompt   = "login-id"
}

# __generated__ by Terraform from "cgr_HxDXvlzInOxDUnmt"
resource "auth0_client_grant" "djg0l3ooj9s8je33zcrkvdhilpzb25ta_https_dev_uw0vq8v32kjv4k1a_us_auth0_com_api_v2" {
  audience  = "https://dev-uw0vq8v32kjv4k1a.us.auth0.com/api/v2/"
  client_id = "dJG0l3oOj9S8jE33zcrkVDhiLpzB25Ta"
  scopes    = ["read:client_grants", "create:client_grants", "delete:client_grants", "update:client_grants", "read:users", "update:users", "delete:users", "create:users", "read:users_app_metadata", "update:users_app_metadata", "delete:users_app_metadata", "create:users_app_metadata", "read:user_custom_blocks", "create:user_custom_blocks", "delete:user_custom_blocks", "create:user_tickets", "read:clients", "update:clients", "delete:clients", "create:clients", "read:client_keys", "update:client_keys", "delete:client_keys", "create:client_keys", "read:connections", "update:connections", "delete:connections", "create:connections", "read:resource_servers", "update:resource_servers", "delete:resource_servers", "create:resource_servers", "read:device_credentials", "update:device_credentials", "delete:device_credentials", "create:device_credentials", "read:rules", "update:rules", "delete:rules", "create:rules", "read:rules_configs", "update:rules_configs", "delete:rules_configs", "read:hooks", "update:hooks", "delete:hooks", "create:hooks", "read:actions", "update:actions", "delete:actions", "create:actions", "read:email_provider", "update:email_provider", "delete:email_provider", "create:email_provider", "blacklist:tokens", "read:stats", "read:insights", "read:tenant_settings", "update:tenant_settings", "read:logs", "read:logs_users", "read:shields", "create:shields", "update:shields", "delete:shields", "read:anomaly_blocks", "delete:anomaly_blocks", "update:triggers", "read:triggers", "read:grants", "delete:grants", "read:guardian_factors", "update:guardian_factors", "read:guardian_enrollments", "delete:guardian_enrollments", "create:guardian_enrollment_tickets", "read:user_idp_tokens", "create:passwords_checking_job", "delete:passwords_checking_job", "read:custom_domains", "delete:custom_domains", "create:custom_domains", "update:custom_domains", "read:email_templates", "create:email_templates", "update:email_templates", "read:mfa_policies", "update:mfa_policies", "read:roles", "create:roles", "delete:roles", "update:roles", "read:prompts", "update:prompts", "read:branding", "update:branding", "delete:branding", "read:log_streams", "create:log_streams", "delete:log_streams", "update:log_streams", "create:signing_keys", "read:signing_keys", "update:signing_keys", "read:limits", "update:limits", "create:role_members", "read:role_members", "delete:role_members", "read:entitlements", "read:attack_protection", "update:attack_protection", "read:organizations_summary", "create:authentication_methods", "read:authentication_methods", "update:authentication_methods", "delete:authentication_methods", "read:organizations", "update:organizations", "create:organizations", "delete:organizations", "create:organization_members", "read:organization_members", "delete:organization_members", "create:organization_connections", "read:organization_connections", "update:organization_connections", "delete:organization_connections", "create:organization_member_roles", "read:organization_member_roles", "delete:organization_member_roles", "create:organization_invitations", "read:organization_invitations", "delete:organization_invitations", "read:scim_config", "create:scim_config", "update:scim_config", "delete:scim_config", "create:scim_token", "read:scim_token", "delete:scim_token", "delete:phone_providers", "create:phone_providers", "read:phone_providers", "update:phone_providers", "delete:phone_templates", "create:phone_templates", "read:phone_templates", "update:phone_templates", "create:encryption_keys", "read:encryption_keys", "update:encryption_keys", "delete:encryption_keys", "read:sessions", "delete:sessions", "read:refresh_tokens", "delete:refresh_tokens", "create:self_service_profiles", "read:self_service_profiles", "update:self_service_profiles", "delete:self_service_profiles", "create:sso_access_tickets", "read:client_credentials", "create:client_credentials", "update:client_credentials", "delete:client_credentials"]
}

# __generated__ by Terraform from "signup-id::en"
resource "auth0_prompt_custom_text" "en_signup_id" {
  body     = "{}"
  language = "en"
  prompt   = "signup-id"
}

# __generated__ by Terraform from "email-verification::en"
resource "auth0_prompt_custom_text" "en_email_verification" {
  body     = "{}"
  language = "en"
  prompt   = "email-verification"
}

# __generated__ by Terraform from "mfa-push::en"
resource "auth0_prompt_custom_text" "en_mfa_push" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-push"
}

# __generated__ by Terraform from "3q1xPR0yaLoTqFvbDW98YEp8flEkG3Au"
resource "auth0_client" "api_explorer_application" {
  allowed_clients                       = []
  allowed_logout_urls                   = []
  allowed_origins                       = []
  app_type                              = "non_interactive"
  callbacks                             = []
  client_aliases                        = []
  client_metadata                       = {}
  cross_origin_auth                     = false
  cross_origin_loc                      = null
  custom_login_page                     = null
  custom_login_page_on                  = true
  description                           = null
  form_template                         = null
  grant_types                           = ["client_credentials"]
  initiate_login_uri                    = null
  is_first_party                        = true
  is_token_endpoint_ip_header_trusted   = false
  logo_uri                              = null
  name                                  = "API Explorer Application"
  organization_require_behavior         = null
  organization_usage                    = null
  require_pushed_authorization_requests = false
  sso                                   = false
  sso_disabled                          = false
  web_origins                           = []
  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
  refresh_token {
    expiration_type              = "non-expiring"
    idle_token_lifetime          = 2592000
    infinite_idle_token_lifetime = true
    infinite_token_lifetime      = true
    leeway                       = 0
    rotation_type                = "non-rotating"
    token_lifetime               = 31557600
  }
}

# __generated__ by Terraform from "mfa-sms::en"
resource "auth0_prompt_custom_text" "en_mfa_sms" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-sms"
}

# __generated__ by Terraform from "email-otp-challenge::en"
resource "auth0_prompt_custom_text" "en_email_otp_challenge" {
  body     = "{}"
  language = "en"
  prompt   = "email-otp-challenge"
}

# __generated__ by Terraform from "mfa-webauthn::en"
resource "auth0_prompt_custom_text" "en_mfa_webauthn" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-webauthn"
}

# __generated__ by Terraform from "status::en"
resource "auth0_prompt_custom_text" "en_status" {
  body     = "{}"
  language = "en"
  prompt   = "status"
}

# __generated__ by Terraform from "cf71636b-8e43-45e8-834a-76c1157b3aeb"
resource "auth0_guardian" "guardian" {
  email         = false
  otp           = false
  policy        = "never"
  recovery_code = false
  duo {
    enabled         = false
    hostname        = null
    integration_key = null
    secret_key      = null # sensitive
  }
  phone {
    enabled       = false
    message_types = []
    provider      = null
  }
  push {
    enabled  = false
    provider = null
  }
  webauthn_platform {
    enabled                  = false
    override_relying_party   = false
    relying_party_identifier = null
  }
  webauthn_roaming {
    enabled                  = false
    override_relying_party   = false
    relying_party_identifier = null
    user_verification        = null
  }
}

# __generated__ by Terraform from "mfa-voice::en"
resource "auth0_prompt_custom_text" "en_mfa_voice" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-voice"
}

# __generated__ by Terraform from "invitation::en"
resource "auth0_prompt_custom_text" "en_invitation" {
  body     = "{}"
  language = "en"
  prompt   = "invitation"
}

# __generated__ by Terraform from "mfa-phone::en"
resource "auth0_prompt_custom_text" "en_mfa_phone" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-phone"
}

# __generated__ by Terraform from "16a2a239-04b2-433a-85d4-a9928d366a6e"
resource "auth0_pages" "pages" {
  login {
    enabled = false
    html    = ""
  }
}

# __generated__ by Terraform from "organizations::en"
resource "auth0_prompt_custom_text" "en_organizations" {
  body     = "{}"
  language = "en"
  prompt   = "organizations"
}

# __generated__ by Terraform from "device-flow::en"
resource "auth0_prompt_custom_text" "en_device_flow" {
  body     = "{}"
  language = "en"
  prompt   = "device-flow"
}

# __generated__ by Terraform from "con_6ICbUyfKbC1WDnJy"
resource "auth0_connection" "username_password_authentication" {
  display_name         = null
  is_domain_connection = false
  metadata             = {}
  name                 = "Username-Password-Authentication"
  show_as_button       = null
  strategy             = "auth0"
  options {
    adfs_server            = null
    allowed_audiences      = []
    api_enable_users       = false
    app_id                 = null
    auth_params            = {}
    authorization_endpoint = null
    brute_force_protection = true
    client_id              = null
    client_secret          = null # sensitive
    community_base_url     = null
    configuration          = null # sensitive
    custom_scripts = {
      change_password = "function changePassword(email, newPassword, callback) {\n  // This script should change the password stored for the current user in your\n  // database. It is executed when the user clicks on the confirmation link\n  // after a reset password request.\n  // The content and behavior of password confirmation emails can be customized\n  // here: https://manage.auth0.com/#/emails\n  // The `newPassword` parameter of this function is in plain text. It must be\n  // hashed/salted to match whatever is stored in your database.\n  //\n  // There are three ways that this script can finish:\n  // 1. The user's password was updated successfully:\n  //     callback(null, true);\n  // 2. The user's password was not updated:\n  //     callback(null, false);\n  // 3. Something went wrong while trying to reach your database:\n  //     callback(new Error(\"my error message\"));\n  //\n  // If an error is returned, it will be passed to the query string of the page\n  // where the user is being redirected to after clicking the confirmation link.\n  // For example, returning `callback(new Error(\"error\"))` and redirecting to\n  // https://example.com would redirect to the following URL:\n  //     https://example.com?email=alice%40example.com&message=error&success=false\n\n  const msg = 'Please implement the Change Password script for this database ' +\n    'connection at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      create          = "function create(user, callback) {\n  // This script should create a user entry in your existing database. It will\n  // be executed when a user attempts to sign up, or when a user is created\n  // through the Auth0 dashboard or API.\n  // When this script has finished executing, the Login script will be\n  // executed immediately afterwards, to verify that the user was created\n  // successfully.\n  //\n  // The user object will always contain the following properties:\n  // * email: the user's email\n  // * password: the password entered by the user, in plain text\n  // * tenant: the name of this Auth0 account\n  // * client_id: the client ID of the application where the user signed up, or\n  //              API key if created through the API or Auth0 dashboard\n  // * connection: the name of this database connection\n  //\n  // There are three ways this script can finish:\n  // 1. A user was successfully created\n  //     callback(null);\n  // 2. This user already exists in your database\n  //     callback(new ValidationError(\"user_exists\", \"my error message\"));\n  // 3. Something went wrong while trying to reach your database\n  //     callback(new Error(\"my error message\"));\n\n  const msg = 'Please implement the Create script for this database connection ' +\n    'at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      delete          = "function remove(id, callback) {\n  // This script remove a user from your existing database.\n  // It is executed whenever a user is deleted from the API or Auth0 dashboard.\n  //\n  // There are two ways that this script can finish:\n  // 1. The user was removed successfully:\n  //     callback(null);\n  // 2. Something went wrong while trying to reach your database:\n  //     callback(new Error(\"my error message\"));\n\n  const msg = 'Please implement the Delete script for this database ' +\n    'connection at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      get_user        = "function getByEmail(email, callback) {\n  // This script should retrieve a user profile from your existing database,\n  // without authenticating the user.\n  // It is used to check if a user exists before executing flows that do not\n  // require authentication (signup and password reset).\n  //\n  // There are three ways this script can finish:\n  // 1. A user was successfully found. The profile should be in the following\n  // format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema.\n  //     callback(null, profile);\n  // 2. A user was not found\n  //     callback(null);\n  // 3. Something went wrong while trying to reach your database:\n  //     callback(new Error(\"my error message\"));\n\n  const msg = 'Please implement the Get User script for this database connection ' +\n    'at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      login           = "function login(email, password, callback) {\n  // This script should authenticate a user against the credentials stored in\n  // your database.\n  // It is executed when a user attempts to log in or immediately after signing\n  // up (as a verification that the user was successfully signed up).\n  //\n  // Everything returned by this script will be set as part of the user profile\n  // and will be visible by any of the tenant admins. Avoid adding attributes\n  // with values such as passwords, keys, secrets, etc.\n  //\n  // The `password` parameter of this function is in plain text. It must be\n  // hashed/salted to match whatever is stored in your database. For example:\n  //\n  //     var bcrypt = require('bcrypt@0.8.5');\n  //     bcrypt.compare(password, dbPasswordHash, function(err, res)) { ... }\n  //\n  // There are three ways this script can finish:\n  // 1. The user's credentials are valid. The returned user profile should be in\n  // the following format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema\n  //     var profile = {\n  //       user_id: ..., // user_id is mandatory\n  //       email: ...,\n  //       [...]\n  //     };\n  //     callback(null, profile);\n  // 2. The user's credentials are invalid\n  //     callback(new WrongUsernameOrPasswordError(email, \"my error message\"));\n  //\n  //    Note: Passing no arguments or a falsey first argument to\n  //    `WrongUsernameOrPasswordError` will result in the error being logged as\n  //    an `fu` event (invalid username/email) with an empty string for a user_id.\n  //    Providing a truthy first argument will result in the error being logged\n  //    as an `fp` event (the user exists, but the password is invalid) with a\n  //    user_id value of \"auth0|<first argument>\". See the `Log Event Type Codes`\n  //    documentation for more information about these event types:\n  //    https://auth0.com/docs/deploy-monitor/logs/log-event-type-codes\n  // 3. Something went wrong while trying to reach your database\n  //     callback(new Error(\"my error message\"));\n  //\n  // A list of Node.js modules which can be referenced is available here:\n  //\n  //    https://tehsis.github.io/webtaskio-canirequire/\n\n  const msg = 'Please implement the Login script for this database connection ' +\n    'at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
      verify          = "function verify(email, callback) {\n  // This script should mark the current user's email address as verified in\n  // your database.\n  // It is executed whenever a user clicks the verification link sent by email.\n  // These emails can be customized at https://manage.auth0.com/#/emails.\n  // It is safe to assume that the user's email already exists in your database,\n  // because verification emails, if enabled, are sent immediately after a\n  // successful signup.\n  //\n  // There are two ways that this script can finish:\n  // 1. The user's email was verified successfully\n  //     callback(null, true);\n  // 2. Something went wrong while trying to reach your database:\n  //     callback(new Error(\"my error message\"));\n  //\n  // If an error is returned, it will be passed to the query string of the page\n  // where the user is being redirected to after clicking the verification link.\n  // For example, returning `callback(new Error(\"error\"))` and redirecting to\n  // https://example.com would redirect to the following URL:\n  //     https://example.com?email=alice%40example.com&message=error&success=false\n\n  const msg = 'Please implement the Verify script for this database connection ' +\n    'at https://manage.auth0.com/#/connections/database';\n  return callback(new Error(msg));\n}\n"
    }
    debug                                  = false
    digest_algorithm                       = null
    disable_cache                          = false
    disable_self_service_change_password   = false
    disable_sign_out                       = false
    disable_signup                         = true
    discovery_url                          = null
    domain                                 = null
    domain_aliases                         = []
    enable_script_context                  = false
    enabled_database_customization         = false
    entity_id                              = null
    fed_metadata_xml                       = null
    fields_map                             = null
    forward_request_info                   = false
    from                                   = null
    gateway_url                            = null
    icon_url                               = null
    identity_api                           = null
    import_mode                            = false
    ips                                    = []
    issuer                                 = null
    jwks_uri                               = null
    key_id                                 = null
    map_user_id_to_id                      = false
    max_groups_to_retrieve                 = null
    messaging_service_sid                  = null
    metadata_url                           = null
    metadata_xml                           = null
    name                                   = null
    non_persistent_attrs                   = []
    password_policy                        = "good"
    ping_federate_base_url                 = null
    pkce_enabled                           = false
    protocol_binding                       = null
    provider                               = null
    request_template                       = null
    requires_username                      = false
    scopes                                 = []
    scripts                                = {}
    set_user_root_attributes               = null
    should_trust_email_verified_connection = null
    sign_in_endpoint                       = null
    sign_out_endpoint                      = null
    sign_saml_request                      = false
    signature_algorithm                    = null
    signing_cert                           = null
    strategy_version                       = 0
    subject                                = null
    syntax                                 = null
    team_id                                = null
    template                               = null
    tenant_domain                          = null
    token_endpoint                         = null
    twilio_sid                             = null
    twilio_token                           = null # sensitive
    type                                   = null
    upstream_params                        = null
    use_cert_auth                          = false
    use_kerberos                           = false
    use_wsfed                              = false
    user_id_attribute                      = null
    userinfo_endpoint                      = null
    waad_common_endpoint                   = false
    waad_protocol                          = null
    mfa {
      active                 = true
      return_enroll_settings = true
    }
    password_complexity_options {
      min_length = 8
    }
    password_dictionary {
      dictionary = []
      enable     = false
    }
    password_history {
      enable = false
      size   = 5
    }
    password_no_personal_info {
      enable = false
    }
  }
}

# __generated__ by Terraform from "common::en"
resource "auth0_prompt_custom_text" "en_common" {
  body     = "{}"
  language = "en"
  prompt   = "common"
}

# __generated__ by Terraform from "login::en"
resource "auth0_prompt_custom_text" "en_login" {
  body     = "{}"
  language = "en"
  prompt   = "login"
}

# __generated__ by Terraform from "reset-password::en"
resource "auth0_prompt_custom_text" "en_reset_password" {
  body     = "{}"
  language = "en"
  prompt   = "reset-password"
}

# __generated__ by Terraform from "con_J2dL18cCOuBjmvfY"
resource "auth0_connection" "email" {
  display_name         = null
  is_domain_connection = false
  metadata             = {}
  name                 = "email"
  show_as_button       = null
  strategy             = "email"
  options {
    adfs_server                            = null
    allowed_audiences                      = []
    api_enable_users                       = false
    app_id                                 = null
    auth_params                            = {}
    authorization_endpoint                 = null
    brute_force_protection                 = true
    client_id                              = null
    client_secret                          = null # sensitive
    community_base_url                     = null
    configuration                          = null # sensitive
    custom_scripts                         = {}
    debug                                  = false
    digest_algorithm                       = null
    disable_cache                          = false
    disable_self_service_change_password   = false
    disable_sign_out                       = false
    disable_signup                         = true
    discovery_url                          = null
    domain                                 = null
    domain_aliases                         = []
    enable_script_context                  = false
    enabled_database_customization         = false
    entity_id                              = null
    fed_metadata_xml                       = null
    fields_map                             = null
    forward_request_info                   = false
    from                                   = "{{ application.name }} <root@auth0.com>"
    gateway_url                            = null
    icon_url                               = null
    identity_api                           = null
    import_mode                            = false
    ips                                    = []
    issuer                                 = null
    jwks_uri                               = null
    key_id                                 = null
    map_user_id_to_id                      = false
    max_groups_to_retrieve                 = null
    messaging_service_sid                  = null
    metadata_url                           = null
    metadata_xml                           = null
    name                                   = "email"
    non_persistent_attrs                   = []
    password_policy                        = null
    ping_federate_base_url                 = null
    pkce_enabled                           = false
    protocol_binding                       = null
    provider                               = null
    request_template                       = null
    requires_username                      = false
    scopes                                 = []
    scripts                                = {}
    set_user_root_attributes               = null
    should_trust_email_verified_connection = null
    sign_in_endpoint                       = null
    sign_out_endpoint                      = null
    sign_saml_request                      = false
    signature_algorithm                    = null
    signing_cert                           = null
    strategy_version                       = 0
    subject                                = "Welcome to {{ application.name }}"
    syntax                                 = "liquid"
    team_id                                = null
    template                               = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n  <head>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n    <style type=\"text/css\">.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img{line-height:100%}#outlook a{padding:0}.ExternalClass,.ReadMsgBody{width:100%}a,blockquote,body,li,p,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic;border:0;height:auto;outline:0;text-decoration:none}table{border-collapse:collapse!important}#bodyCell,#bodyTable,body{height:100%!important;margin:0;padding:0;font-family:ProximaNova,sans-serif}#bodyCell{padding:20px}#bodyTable{width:600px}@font-face{font-family:ProximaNova;src:url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot);src:url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot?#iefix) format('embedded-opentype'),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.woff) format('woff');font-weight:400;font-style:normal}@font-face{font-family:ProximaNova;src:url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot);src:url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot?#iefix) format('embedded-opentype'),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.woff) format('woff');font-weight:600;font-style:normal}@media only screen and (max-width:480px){#bodyTable,body{width:100%!important}a,blockquote,body,li,p,table,td{-webkit-text-size-adjust:none!important}body{min-width:100%!important}#bodyTable{max-width:600px!important}#signIn{max-width:280px!important}}\n</style>\n  </head>\n  <body leftmargin=\"0\" marginwidth=\"0\" topmargin=\"0\" marginheight=\"0\" offset=\"0\" style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;margin: 0;padding: 0;font-family: &quot;ProximaNova&quot;, sans-serif;height: 100% !important;\"><center>\n  <table style=\"width: 600px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: &quot;ProximaNova&quot;, sans-serif;border-collapse: collapse !important;height: 100% !important;\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\" id=\"bodyTable\">\n    <tr>\n      <td align=\"center\" valign=\"top\" id=\"bodyCell\" style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 20px;font-family: &quot;ProximaNova&quot;, sans-serif;height: 100% !important;\">\n      <div class=\"main\">\n        <p style=\"text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; margin-bottom: 30px;\">\n          <img src=\"https://cdn.auth0.com/styleguide/2.0.9/lib/logos/img/badge.png\" width=\"50\" alt=\"Your logo goes here\" style=\"-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;\">\n        </p>\n\n        <!-- Email change content -->\n        {% if operation == 'change_email' %}\n\n          <p style=\"font-size: 1.2em;line-height: 1.3;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;\">Your email address has been updated.</p>\n\n        {% else %}\n\n          <!-- Signup email content -->\n          {% if send == 'link' or send == 'link_ios' or send == 'link_android' %}\n\n            <p style=\"font-size: 1.2em;line-height: 1.3;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;\">Click and confirm that you want to sign in to {{ application.name }}. This link will expire in three minutes.</p>\n\n            <div style=\"text-align:center\">\n            <a id=\"signIn\" style=\"text-transform: uppercase;letter-spacing: 1px;color: #ffffff;text-decoration: none;display: inline-block;min-height: 48px;line-height: 48px;padding-top: 0;padding-right: 26px;padding-bottom: 0;margin: 20px 0;padding-left: 26px;border: 0;outline: 0;background: #eb5424;font-size: 14px;font-style: normal;font-weight: 400;text-align: center;white-space: nowrap;border-radius: 3px;text-overflow: ellipsis;max-width: 280px;overflow: hidden;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;\" href=\"{{ link }}\">Sign in to {{ application.name }}</a>\n            </div>\n\n            <p style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;\">Or sign in using this link:</p>\n            <p style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;\"><a style=\"font-size: 12px; color: #A9B3BC; text-decoration: none;word-break: break-all;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;\" href=\"{{ link }}\">{{ link }}</a></p>\n\n            {% elsif send == 'code' %}\n\n            <p style=\"font-size: 1.4em; line-height: 1.3;\">Your verification code is: <b>{{ code }}</b></p>\n\n          {% endif %}\n\n        {% endif %}\n\n        <p style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;\">If you are having any issues with your account, please don't hesitate to contact us by replying to this mail.</p>\n\n        <br>\n        Thanks!\n        <br>\n\n        <strong>{{ application.name }}</strong>\n\n        <br><br>\n        <hr style=\"border: 2px solid #EAEEF3; border-bottom: 0; margin: 20px 0;\">\n        <p style=\"text-align: center;color: #A9B3BC;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;\">\n          If you did not make this request, please contact us by replying to this mail.\n        </p>\n      </div>\n      </td>\n    </tr>\n  </table>\n</center>\n</body>\n</html>"
    tenant_domain                          = null
    token_endpoint                         = null
    twilio_sid                             = null
    twilio_token                           = null # sensitive
    type                                   = null
    upstream_params                        = null
    use_cert_auth                          = false
    use_kerberos                           = false
    use_wsfed                              = false
    user_id_attribute                      = null
    userinfo_endpoint                      = null
    waad_common_endpoint                   = false
    waad_protocol                          = null
    totp {
      length    = 6
      time_step = 180
    }
  }
}

# __generated__ by Terraform from "6acPTZ8ByMGGUh4qivCTkRa3v06DvwDi"
resource "auth0_client" "swim_app_tst" {
  allowed_clients                       = []
  allowed_logout_urls                   = ["https://swim-tracker-tst.vercel.app/"]
  allowed_origins                       = []
  app_type                              = "regular_web"
  callbacks                             = ["https://swim-tracker-tst.vercel.app/api/auth/callback/auth0"]
  client_aliases                        = []
  client_metadata                       = {}
  cross_origin_auth                     = false
  cross_origin_loc                      = null
  custom_login_page                     = null
  custom_login_page_on                  = true
  description                           = null
  form_template                         = null
  grant_types                           = ["authorization_code", "implicit", "refresh_token", "client_credentials"]
  initiate_login_uri                    = null
  is_first_party                        = true
  is_token_endpoint_ip_header_trusted   = false
  logo_uri                              = null
  name                                  = "swim-app-tst"
  organization_require_behavior         = null
  organization_usage                    = null
  require_pushed_authorization_requests = false
  sso                                   = false
  sso_disabled                          = false
  web_origins                           = []
  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
  native_social_login {
    apple {
      enabled = false
    }
    facebook {
      enabled = false
    }
  }
  refresh_token {
    expiration_type              = "non-expiring"
    idle_token_lifetime          = 2592000
    infinite_idle_token_lifetime = true
    infinite_token_lifetime      = true
    leeway                       = 0
    rotation_type                = "non-rotating"
    token_lifetime               = 31557600
  }
}

# __generated__ by Terraform from "pcbU8tuKH5G6WwoBtwVmB0BzvZcZ6mPp"
resource "auth0_client" "swimapp_local" {
  allowed_clients                       = []
  allowed_logout_urls                   = ["http://localhost:3000/", "http://192.168.2.45:3000/", "http://192.168.2.19:3000/"]
  allowed_origins                       = []
  app_type                              = "regular_web"
  callbacks                             = ["http://localhost:3000/api/auth/callback", "http://192.168.2.45:3000/api/auth/callback", "http://localhost:3000/api/auth/callback/auth0", "http://192.168.2.45:3000/api/auth/callback/auth0", "http://192.168..2.19:3000/api/auth/callback/auth0"]
  client_aliases                        = []
  client_metadata                       = {}
  cross_origin_auth                     = false
  cross_origin_loc                      = null
  custom_login_page                     = null
  custom_login_page_on                  = true
  description                           = null
  form_template                         = null
  grant_types                           = ["authorization_code", "implicit", "refresh_token", "client_credentials"]
  initiate_login_uri                    = null
  is_first_party                        = true
  is_token_endpoint_ip_header_trusted   = false
  logo_uri                              = null
  name                                  = "swimapp-local"
  organization_require_behavior         = null
  organization_usage                    = null
  require_pushed_authorization_requests = false
  sso                                   = false
  sso_disabled                          = false
  web_origins                           = []
  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
  native_social_login {
    apple {
      enabled = false
    }
    facebook {
      enabled = false
    }
  }
  refresh_token {
    expiration_type              = "non-expiring"
    idle_token_lifetime          = 2592000
    infinite_idle_token_lifetime = true
    infinite_token_lifetime      = true
    leeway                       = 0
    rotation_type                = "non-rotating"
    token_lifetime               = 31557600
  }
}

# __generated__ by Terraform from "mfa-recovery-code::en"
resource "auth0_prompt_custom_text" "en_mfa_recovery_code" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-recovery-code"
}

# __generated__ by Terraform from "ebef98b6-54dd-48ae-a031-491db62487ee"
resource "auth0_branding" "branding" {
  favicon_url = null
  logo_url    = null
}

# __generated__ by Terraform from "con_J2dL18cCOuBjmvfY"
resource "auth0_connection_clients" "email" {
  connection_id   = "con_J2dL18cCOuBjmvfY"
  enabled_clients = []
}

# __generated__ by Terraform from "con_6ICbUyfKbC1WDnJy"
resource "auth0_connection_clients" "username_password_authentication" {
  connection_id   = "con_6ICbUyfKbC1WDnJy"
  enabled_clients = ["3q1xPR0yaLoTqFvbDW98YEp8flEkG3Au", "6acPTZ8ByMGGUh4qivCTkRa3v06DvwDi", "dJG0l3oOj9S8jE33zcrkVDhiLpzB25Ta", "pcbU8tuKH5G6WwoBtwVmB0BzvZcZ6mPp"]
}

# __generated__ by Terraform from "login-email-verification::en"
resource "auth0_prompt_custom_text" "en_login_email_verification" {
  body     = "{}"
  language = "en"
  prompt   = "login-email-verification"
}

# __generated__ by Terraform from "mfa-email::en"
resource "auth0_prompt_custom_text" "en_mfa_email" {
  body     = "{}"
  language = "en"
  prompt   = "mfa-email"
}

# __generated__ by Terraform from "cgr_VqR7SfIfMiP9buHR"
resource "auth0_client_grant" "q1xpr0yalotqfvbdw98yep8flekg3au_https_dev_uw0vq8v32kjv4k1a_us_auth0_com_api_v2" {
  audience  = "https://dev-uw0vq8v32kjv4k1a.us.auth0.com/api/v2/"
  client_id = "3q1xPR0yaLoTqFvbDW98YEp8flEkG3Au"
  scopes    = ["read:client_grants", "create:client_grants", "delete:client_grants", "update:client_grants", "read:users", "update:users", "delete:users", "create:users", "read:users_app_metadata", "update:users_app_metadata", "delete:users_app_metadata", "create:users_app_metadata", "read:user_custom_blocks", "create:user_custom_blocks", "delete:user_custom_blocks", "create:user_tickets", "read:clients", "update:clients", "delete:clients", "create:clients", "read:client_keys", "update:client_keys", "delete:client_keys", "create:client_keys", "read:connections", "update:connections", "delete:connections", "create:connections", "read:resource_servers", "update:resource_servers", "delete:resource_servers", "create:resource_servers", "read:device_credentials", "update:device_credentials", "delete:device_credentials", "create:device_credentials", "read:rules", "update:rules", "delete:rules", "create:rules", "read:rules_configs", "update:rules_configs", "delete:rules_configs", "read:hooks", "update:hooks", "delete:hooks", "create:hooks", "read:actions", "update:actions", "delete:actions", "create:actions", "read:email_provider", "update:email_provider", "delete:email_provider", "create:email_provider", "blacklist:tokens", "read:stats", "read:insights", "read:tenant_settings", "update:tenant_settings", "read:logs", "read:logs_users", "read:shields", "create:shields", "update:shields", "delete:shields", "read:anomaly_blocks", "delete:anomaly_blocks", "update:triggers", "read:triggers", "read:grants", "delete:grants", "read:guardian_factors", "update:guardian_factors", "read:guardian_enrollments", "delete:guardian_enrollments", "create:guardian_enrollment_tickets", "read:user_idp_tokens", "create:passwords_checking_job", "delete:passwords_checking_job", "read:custom_domains", "delete:custom_domains", "create:custom_domains", "update:custom_domains", "read:email_templates", "create:email_templates", "update:email_templates", "read:mfa_policies", "update:mfa_policies", "read:roles", "create:roles", "delete:roles", "update:roles", "read:prompts", "update:prompts", "read:branding", "update:branding", "delete:branding", "read:log_streams", "create:log_streams", "delete:log_streams", "update:log_streams", "create:signing_keys", "read:signing_keys", "update:signing_keys", "read:limits", "update:limits", "create:role_members", "read:role_members", "delete:role_members", "read:entitlements", "read:attack_protection", "update:attack_protection", "read:organizations_summary", "create:authentication_methods", "read:authentication_methods", "update:authentication_methods", "delete:authentication_methods", "read:organizations", "update:organizations", "create:organizations", "delete:organizations", "create:organization_members", "read:organization_members", "delete:organization_members", "create:organization_connections", "read:organization_connections", "update:organization_connections", "delete:organization_connections", "create:organization_member_roles", "read:organization_member_roles", "delete:organization_member_roles", "create:organization_invitations", "read:organization_invitations", "delete:organization_invitations", "delete:phone_providers", "create:phone_providers", "read:phone_providers", "update:phone_providers", "delete:phone_templates", "create:phone_templates", "read:phone_templates", "update:phone_templates", "create:encryption_keys", "read:encryption_keys", "update:encryption_keys", "delete:encryption_keys", "read:sessions", "delete:sessions", "read:refresh_tokens", "delete:refresh_tokens", "create:self_service_profiles", "read:self_service_profiles", "update:self_service_profiles", "delete:self_service_profiles", "create:sso_access_tickets", "read:client_credentials", "create:client_credentials", "update:client_credentials", "delete:client_credentials"]
}

# __generated__ by Terraform from "a95b2806-b033-4dac-874c-84f0155882ab"
resource "auth0_attack_protection" "attack_protection" {
  breached_password_detection {
    admin_notification_frequency = []
    enabled                      = false
    method                       = "standard"
    shields                      = []
    pre_user_registration {
      shields = []
    }
  }
  brute_force_protection {
    allowlist    = []
    enabled      = true
    max_attempts = 10
    mode         = "count_per_identifier_and_ip"
    shields      = ["block", "user_notification"]
  }
  suspicious_ip_throttling {
    allowlist = []
    enabled   = true
    shields   = ["admin_notification", "block"]
    pre_login {
      max_attempts = 100
      rate         = 864000
    }
    pre_user_registration {
      max_attempts = 50
      rate         = 1200
    }
  }
}
