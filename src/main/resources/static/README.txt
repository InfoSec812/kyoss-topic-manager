Anything in this directory can be served up a static content from the Vert.x server. The filename MUST match the following REGEX:

\/.*\.(js|html|htm|css|png|gif|jpg|jpeg|JS|HTML|HTM|CSS|PNG|GIF|JPG|JPEG)[?\w\d=_-]*

IF your file matches that REGEX it will be served as static content.