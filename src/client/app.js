//utils
import util from './src/client/util';

global.React = React;

//render
$(() => {
    //navs
    const navItems = $(`
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="index.html">Statistics</a></li>
                <li><a href="controls.html">Controls</a></li>
                <li><a href="config.html">Config</a></li>
            </ul>
        </div>
    `).appendTo('#nav > div.container-fluid');

	//search box
	const searchForm = $(`
		<form class="navbar-form navbar-right">
        	<input id="headerSearchBox" type="text" class="form-control" placeholder="Search... (<namespace>:<control>)">
    	</form>
    `)
    .submit((e) => {
    	const keyword = $.trim( $(e.target).find('input').val() ).toLowerCase();
    	location.href = util.getQueryUrl(`${keyword}`);
    	return false;
    })
    .appendTo('#navbar');

    //scroll to top
    const btnScrollToTop =$(`<button id="btnScrollToTop" class="btn btn-primary">^</button>`)
    	.click(() => $(document).scrollTop(0))
    	.appendTo('#navbar');
})