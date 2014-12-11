
STUDIP.VoteCreator = {
    clearVoteBox: function () {
        var security_token = jQuery("#hidden_vote_box input[name=security_token]").val();
        jQuery("#hidden_vote_box").html('');
        STUDIP.VoteCreator.addToVoteBox("security_token", security_token);
    },
    addToVoteBox: function (name, param) {
        jQuery('<input type="hidden"/>').attr('name', name).val(param).appendTo("#hidden_vote_box");
    },
    submitVoteBox: function () {
        jQuery("#hidden_vote_box").submit();
    },
    getUniqueId: function () {
        var s4 = function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
    }
};

jQuery(function () {
    jQuery(".printcontent ul").before(jQuery("<div class='votecreator' title='Neue Umfrage aus dieser Liste generieren.'></div>"));
    jQuery(".votecreator").bind("click", function () {
        var cid = location.href.match(/cid=(\w{32})/)[1];
        var options = jQuery.map(jQuery(this).closest("ul").children("li"), function (li) { return jQuery(li).html(); });
        STUDIP.VoteCreator.clearVoteBox();
        for (i in options) {
            STUDIP.VoteCreator.addToVoteBox('answers[' + i + '][text]', options[i]);
            STUDIP.VoteCreator.addToVoteBox('answers[' + i + '][answer_id]', STUDIP.VoteCreator.getUniqueId) + i;
        }
        STUDIP.VoteCreator.addToVoteBox('rangeID', cid);
        STUDIP.VoteCreator.addToVoteBox('multipleChoice', 1);
        STUDIP.VoteCreator.addToVoteBox('referer', location.href);
        STUDIP.VoteCreator.addToVoteBox('startMode', "immediate");
        STUDIP.VoteCreator.addToVoteBox('stoptMode', "manual");
        STUDIP.VoteCreator.addToVoteBox('resultVisibility', "end");
        STUDIP.VoteCreator.addToVoteBox('anonymous', "0");
        STUDIP.VoteCreator.addToVoteBox('namesVisibility', "1");
        STUDIP.VoteCreator.addToVoteBox('changeable', "1");
        STUDIP.VoteCreator.submitVoteBox();
    });
});
