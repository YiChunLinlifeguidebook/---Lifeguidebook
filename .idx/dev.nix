{ pkgs, lib, ... }: {
  channel = "stable-24.11";

  imports = lib.optionals (builtins.pathExists ./dev.local.nix) [
    ./dev.local.nix
  ];

  packages = [
    pkgs.bash
    pkgs.coreutils
    pkgs.git
    pkgs.nodejs_22
    pkgs.nodePackages.prettier
    pkgs.nodePackages.eslint
    pkgs.openssh
    pkgs.python312
    pkgs.python312Packages.debugpy
    pkgs.python312Packages.pip
    pkgs.python312Packages.virtualenv
  ];

  env = {
    CHUN_STANDARD_VERSION = "1.0";
    CHUN_STANDARD_DATE_TAG = "20260326";
    CHUN_STANDARD_TRACKS = "T1,T2,T3,T4,T5";
    RELAY_ENV_FILE = "${toString ./.}/../.env.relay";
    M365_DIGEST_SOURCE = "${toString ./.}/../ops/relay/m365-digest-pool";
    OBSIDIAN_LOGIC_SOURCE = "${toString ./.}/../ops/relay/obsidian-logic-vault";
  };

  idx.extensions = [
    "ms-python.python"
    "ms-python.debugpy"
    "eamodio.gitlens"
    "esbenp.prettier-vscode"
    "dbaeumer.vscode-eslint"
    "ms-azuretools.vscode-docker"
    "jeanp413.open-remote-ssh"
  ];

  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "python3"
          "-m"
          "http.server"
          "$PORT"
        ];
        cwd = "..";
        manager = "web";
      };
    };
  };

  idx.workspace.onCreate = {
    chun-standard-bootstrap = "bash scripts/bootstrap_chun_standard.sh";
    default.openFiles = [
      "README.md"
      ".vscode/settings.json"
      "ops/manifests/20260326-T01-5-track-manifest.md"
    ];
  };

  idx.workspace.onStart = {
    chun-standard-relay-map = "bash scripts/setup_relay_paths.sh";
  };

  services.docker.enable = true;
}
