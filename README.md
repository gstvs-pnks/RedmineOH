# RedmineM89
 As for now, a simple Redmine project for Madara89.
 Experimenting with plugins, themes, afterwards Redmine installation will be made more portable. 


## Redmine how-to : 

<details>
  <summary>Installing Redmine (original)</summary>
    
  ```bash
1. Install Dependencies:

     sudo apt update
     sudo apt install -y build-essential libssl-dev libreadline-dev zlib1g-dev libyaml-dev libxml2-dev libxslt1-dev libcurl4-openssl-dev libicu-dev libmariadb-dev-compat libmariadb-dev mariadb-client mariadb-server
     
     sudo apt install -y ruby-full
     sudo gem install bundler
     

2. Download Redmine:

     git clone https://github.com/redmine/redmine.git /home/main/Documents/GitHub/RedmineM89
     cd /home/main/Documents/GitHub/RedmineM89
     

3. Install Gems:

     bundle install --without development test
     

4. Configure MySQL/MariaDB Database:

     sudo apt install -y mariadb-server
     sudo apt install -y mariadb-client

     sudo mysql -u root -p
     CREATE DATABASE redmine CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
     CREATE USER 'redmine'@'localhost' IDENTIFIED BY '...';
     GRANT ALL PRIVILEGES ON redmine.* TO 'redmine'@'localhost';
     FLUSH PRIVILEGES;
     EXIT;
     

5. Configure Redmine Database Connection:
   - Edited `config/database.yml` to set up the connection to MySQL/MariaDB with the Redmine database:

     production:
       adapter: mysql2
       database: redmine
       host: localhost
       username: redmine
       password: "..."
       encoding: utf8mb4
     

6. Database Migration:
     
     RAILS_ENV=production bundle exec rake db:migrate
     

7. Start Redmine:

     RAILS_ENV=production bundle exec rails server -b 0.0.0.0


  ```

</details>

<details>
  <summary>Installing Redmine (this version)</summary>
    
  ```bash
1. Install Dependencies:

     sudo apt update
     sudo apt install -y build-essential libssl-dev libreadline-dev zlib1g-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev libicu-dev libmariadb-dev-compat libmariadb-dev
     
     sudo apt install -y ruby-full
     sudo gem install bundler
     

2. Download Your Redmine Fork:

     git clone https://github.com/gstvs-pnks/RedmineM89 /home/main/Documents/GitHub/RedmineM89
     cd /home/main/Documents/GitHub/RedmineM89
     

3. Install Gems:

     bundle install --without development test
     

4. Configure MySQL/MariaDB Database:
     
     sudo apt install -y mariadb-client

     sudo mysql -u root -p
     CREATE DATABASE redmine CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
     CREATE USER 'redmine'@'localhost' IDENTIFIED BY '...';
     GRANT ALL PRIVILEGES ON redmine.* TO 'redmine'@'localhost';
     FLUSH PRIVILEGES;
     EXIT;
     

5. Configure Redmine Database Connection:
   - Edit `config/database.yml`:

     production:
       adapter: mysql2
       database: redmine
       host: localhost
       username: redmine
       password: "..."
       encoding: utf8mb4
     

6. Database Migration:

     RAILS_ENV=production bundle exec rake db:migrate
     

7. Start Redmine:

     RAILS_ENV=production bundle exec rails server -b 0.0.0.0

  ```

</details>


<details>
  <summary>Installing Redmine themes</summary>
    
  ```bash
1. Find wanted theme on Github etc., download .zip

2. Kill Redmine process

3. Unzip the file in RedmineM89/themes

4. In Redmine dir - 
    
    RAILS_ENV=production bundle exec rake assets:precompile

5. Boot up Redmine

  ```

</details>


<details>
  <summary>Installing Redmine plugins</summary>
    
  ```bash
1. Find the plugin, download .zip etc. 

2. Kill Redmine process

3. Unzip the file in RedmineM89/plugins

4. In Redmine dir - 

    bundle install
    RAILS_ENV=production bundle exec rake assets:precompile
    
5. Boot up Redmine
  ```

</details>

## Docker related information : 

<details>
  <summary>Kill/delete everything related to docker and redmine</summary>
    
  ```bash
sudo docker stop $(sudo docker ps -aq) 2>/dev/null
sudo docker rm -f $(sudo docker ps -aq) 2>/dev/null
sudo docker rmi -f $(sudo docker images -q) 2>/dev/null
sudo docker volume prune -f
sudo docker network rm $(sudo docker network ls -q) 2>/dev/null
sudo apt remove -y docker-compose
sudo apt remove -y docker.io docker-doc docker-compose-plugin docker-ce docker-ce-cli containerd runc
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo apt autoremove -y
sudo apt autoclean
  ```

</details>

## Might come in handy : 

<details>
  <summary>GitHub Desktop install (Debian13)</summary>
    
  ```bash
GitHub page - https://github.com/shiftkey/desktop

Commands -

   wget -qO - https://mirror.mwt.me/shiftkey-desktop/gpgkey | gpg --dearmor | sudo tee /usr/share/keyrings/mwt-desktop.gpg > /dev/null

   sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/mwt-desktop.gpg] https://mirror.mwt.me/shiftkey-desktop/deb/ any main" > /etc/apt/sources.list.d/mwt-desktop.list'

   sudo apt update && sudo apt install github-desktop

  ```

</details>
