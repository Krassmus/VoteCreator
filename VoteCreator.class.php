<?php

class VoteCreator extends StudIPPlugin implements SystemPlugin {

    public function __construct() {
        parent::__construct();
        if (stripos($_SERVER['REQUEST_URI'], "wiki.php") !== false) {
            PageLayout::addScript($this->getPluginURL()."/assets/votecreator.js");
            PageLayout::addStylesheet($this->getPluginURL()."/assets/votecreator.css");
            PageLayout::addBodyElements('
                <form action="'.URLHelper::getLink("admin_vote.php", array('page' => "edit", 'type' => "vote")).'" method="post" id="hidden_vote_box">
                '.CSRFProtection::tokenTag().'
                </form>
            ');
        }
    }


}