/*
UI functions dedicated to the Github modal panel
*/

var github_api_user = 'https://api.github.com/users/';
var github_api_repos = '/repos';

$('a[id^="github-link"]').click(function (e)
{
    var url = prepare_link(e, this);
    adjustSelection("github-link");
    remove_modal();
    showGithub(url, this);
});

function showGithub(e, t) {
    var url = t.href;
    var github_profile = $("#github-profile");
    if (github_profile.length > 0) {
        github_profile.modal('show');
    }
    else {
        var spinner = (new Spinner(spin_opts)).spin();

        $("#github-link").append(spinner.el);

        $.get('/theme/templates/github-view.html', function(data) {
            // Request succeeded, data contains HTML template, we can load data
            var template = Handlebars.compile(data);
            var github_data = {};
            var user_url = github_api_user+github_username;

            try {
                $.get(user_url, function(user) {
                    user.public_repos = numberWithCommas(user.public_repos);
                    user.following = numberWithCommas(user.following);
                    user.followers = numberWithCommas(user.followers);
                    github_data['user'] = user

                    var repos_url = github_api_user+github_username+github_api_repos;
                    $.get(repos_url, function(repos) {
                        for(var index = 0 ; index < repos.length ; index++) {
                            var repo = repos[index];
                            repo.watchers = numberWithCommas(repo.watchers);
                            repo.forks = numberWithCommas(repo.forks);
                        }
                        github_data['repositories'] = repos

                        var html = template(github_data);
                        $('body').append(html);
                        $("#github-profile").modal();
                        spinner.stop();
                    })
                    .error(function() {
                        window.location.href = url;
                        spinner.stop();
                    });
                })
                .error(function() {
                    window.location.href = url;
                    spinner.stop();
                });
            }
            catch (err) {
                window.location.href = url;
                spinner.stop();
            }
        })
        .error(function() {
            window.location.href = url;
            spinner.stop();
        });
    }
}

