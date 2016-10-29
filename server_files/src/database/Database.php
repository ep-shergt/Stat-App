<?php

require __DIR__ . "/config.php";

	class Database {

		public $isConn;
		protected $datab;

		// connect to db
		public function __construct ($username = USERNAME, $password = PASSWORD, $host = HOST, $dbname = DB, $options=[]) {
			$this->isConn = TRUE;
			try {
				$this->datab = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password, $options);
				$this->datab->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$this->datab->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
			} catch (PDOException $e) {
				throw new Exception("Datenbank nicht erreichbar: " . $e->getMessage());
			}
		}

		//disconnect from db
		public function disconnect () {
			$this->datab = NULL;
			$this->isConn = FALSE;
		}

		// get row
		public function getRow ($query, $params = []) {
			try {
				$stmt = $this->datab->prepare($query);
				$stmt->execute($params);
				return $stmt->fetch();
			} catch (PDOException $e) {
				throw new Exception($e->getMessage());
			}
		}

		// get rows
		public function getRows ($query, $params = []) {
			try {
				$stmt = $this->datab->prepare($query);
				$stmt->execute($params);
				return $stmt->fetchAll();
			} catch (PDOException $e) {
				throw new Exception($e->getMessage());
			}
		}

		// insert row
		public function insertRow ($query, $params = []) {
			try {
				$stmt = $this->datab->prepare($query);
				$stmt->execute($params);
				return TRUE;
			} catch (PDOException $e) {
				throw new Exception($e->getMessage());
			}
		}

		//update row
		public function updateRow () {
			$this->insertRow($query, $params);
		}

		//delete row
		public function deleteRow () {
			$this->insertRow($query, $params);
		}

		public function die_r($value) {
			echo '<pre>';
			print_r($value);
			echo '</pre>';
			die();
		}

	}

