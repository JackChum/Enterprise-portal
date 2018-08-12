<li class="show">
                                <a href='[field:arcurl/]'>
                                    <img src='[field:picname/]'></a>
                                <div class="right">
                                    <a href='[field:arcurl/]'>
                                        <h3>[field:title/]</h3></a>
                                    <span>[field:pubdate function='GetDateTimeMK(@me)' /]</span>
                                    <p>
										[field:description function='cn_substr(Html2text("@me")."...",200)'/]
                                    </p>
                                </div>
                            </li>