# trigger-travis

Used to tigger a travis build programmatically, using travis api 3.  I'd be happy to get this to be more robust. Please fork and hack away.

It accepts the following arguments
```
-o  --owner     the owner of the github repo e.g [ishmael-readingplus]/trigger-travis
-r  --repo      the name of the repo e.g. ishmael-readingplus/[trigger-travis]
-t  --token     the travis api token 
--pro           use if the repo is on github.com default is github.org
```

# Inspirations - in no paticular order 
[Trigger a Travis CI build from another project’s build](https://hiddentao.com/archives/2016/08/29/triggering-travis-ci-build-from-another-projects-build/)

[Dependent builds in Travis](http://eng.rightscale.com/2015/04/27/dependent-builds-in-travis.html)

[https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example](https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example)