<?php
	if ($_SERVER['REQUEST_METHOD'] === "POST") {
		$nodes = file_get_contents('php://input');
		echo strlen($nodes);
	}
?>