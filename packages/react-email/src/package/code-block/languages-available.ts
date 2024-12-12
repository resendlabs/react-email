export type PrismLanguage =
  | "markup"
  | "html"
  | "xml"
  | "svg"
  | "mathml"
  | "ssml"
  | "atom"
  | "rss"
  | "css"
  | "clike"
  | "javascript"
  | "js"
  | "abap"
  | "abnf"
  | "actionscript"
  | "ada"
  | "agda"
  | "al"
  | "antlr4"
  | "g4"
  | "apacheconf"
  | "apex"
  | "apl"
  | "applescript"
  | "aql"
  | "arduino"
  | "ino"
  | "arff"
  | "armasm"
  | "arm-asm"
  | "arturo"
  | "art"
  | "asciidoc"
  | "adoc"
  | "aspnet"
  | "asm6502"
  | "asmatmel"
  | "autohotkey"
  | "autoit"
  | "avisynth"
  | "avs"
  | "avro-idl"
  | "avdl"
  | "awk"
  | "gawk"
  | "bash"
  | "sh"
  | "shell"
  | "basic"
  | "batch"
  | "bbcode"
  | "shortcode"
  | "bbj"
  | "bicep"
  | "birb"
  | "bison"
  | "bnf"
  | "rbnf"
  | "bqn"
  | "brainfuck"
  | "brightscript"
  | "bro"
  | "bsl"
  | "oscript"
  | "c"
  | "csharp"
  | "cs"
  | "dotnet"
  | "cpp"
  | "cfscript"
  | "cfc"
  | "chaiscript"
  | "cil"
  | "cilkc"
  | "cilk-c"
  | "cilkcpp"
  | "cilk-cpp"
  | "cilk"
  | "clojure"
  | "cmake"
  | "cobol"
  | "coffeescript"
  | "coffee"
  | "concurnas"
  | "conc"
  | "csp"
  | "cooklang"
  | "coq"
  | "crystal"
  | "css-extras"
  | "csv"
  | "cue"
  | "cypher"
  | "d"
  | "dart"
  | "dataweave"
  | "dax"
  | "dhall"
  | "diff"
  | "django"
  | "jinja2"
  | "dns-zone-file"
  | "dns-zone"
  | "docker"
  | "dockerfile"
  | "dot"
  | "gv"
  | "ebnf"
  | "editorconfig"
  | "eiffel"
  | "ejs"
  | "eta"
  | "elixir"
  | "elm"
  | "etlua"
  | "erb"
  | "erlang"
  | "excel-formula"
  | "xlsx"
  | "xls"
  | "fsharp"
  | "factor"
  | "false"
  | "firestore-security-rules"
  | "flow"
  | "fortran"
  | "ftl"
  | "gml"
  | "gamemakerlanguage"
  | "gap"
  | "gcode"
  | "gdscript"
  | "gedcom"
  | "gettext"
  | "po"
  | "gherkin"
  | "git"
  | "glsl"
  | "gn"
  | "gni"
  | "linker-script"
  | "ld"
  | "go"
  | "go-module"
  | "go-mod"
  | "gradle"
  | "graphql"
  | "groovy"
  | "haml"
  | "handlebars"
  | "hbs"
  | "mustache"
  | "haskell"
  | "hs"
  | "haxe"
  | "hcl"
  | "hlsl"
  | "hoon"
  | "http"
  | "hpkp"
  | "hsts"
  | "ichigojam"
  | "icon"
  | "icu-message-format"
  | "idris"
  | "idr"
  | "ignore"
  | "gitignore"
  | "hgignore"
  | "npmignore"
  | "inform7"
  | "ini"
  | "io"
  | "j"
  | "java"
  | "javadoc"
  | "javadoclike"
  | "javastacktrace"
  | "jexl"
  | "jolie"
  | "jq"
  | "jsdoc"
  | "js-extras"
  | "json"
  | "webmanifest"
  | "json5"
  | "jsonp"
  | "jsstacktrace"
  | "js-templates"
  | "julia"
  | "keepalived"
  | "keyman"
  | "kotlin"
  | "kt"
  | "kts"
  | "kumir"
  | "kum"
  | "kusto"
  | "latex"
  | "tex"
  | "context"
  | "latte"
  | "less"
  | "lilypond"
  | "ly"
  | "liquid"
  | "lisp"
  | "emacs"
  | "elisp"
  | "emacs-lisp"
  | "livescript"
  | "llvm"
  | "log"
  | "lolcode"
  | "lua"
  | "magma"
  | "makefile"
  | "markdown"
  | "md"
  | "markup-templating"
  | "mata"
  | "matlab"
  | "maxscript"
  | "mel"
  | "mermaid"
  | "metafont"
  | "mizar"
  | "mongodb"
  | "monkey"
  | "moonscript"
  | "moon"
  | "n1ql"
  | "n4js"
  | "n4jsd"
  | "nand2tetris-hdl"
  | "naniscript"
  | "nani"
  | "nasm"
  | "neon"
  | "nevod"
  | "nginx"
  | "nim"
  | "nix"
  | "nsis"
  | "objectivec"
  | "objc"
  | "ocaml"
  | "odin"
  | "opencl"
  | "openqasm"
  | "qasm"
  | "oz"
  | "parigp"
  | "parser"
  | "pascal"
  | "objectpascal"
  | "pascaligo"
  | "psl"
  | "pcaxis"
  | "px"
  | "peoplecode"
  | "pcode"
  | "perl"
  | "php"
  | "phpdoc"
  | "php-extras"
  | "plant-uml"
  | "plantuml"
  | "plsql"
  | "powerquery"
  | "pq"
  | "mscript"
  | "powershell"
  | "processing"
  | "prolog"
  | "promql"
  | "properties"
  | "protobuf"
  | "pug"
  | "puppet"
  | "pure"
  | "purebasic"
  | "pbfasm"
  | "purescript"
  | "purs"
  | "python"
  | "py"
  | "qsharp"
  | "qs"
  | "q"
  | "qml"
  | "qore"
  | "r"
  | "racket"
  | "rkt"
  | "cshtml"
  | "razor"
  | "jsx"
  | "tsx"
  | "reason"
  | "regex"
  | "rego"
  | "renpy"
  | "rpy"
  | "rescript"
  | "res"
  | "rest"
  | "rip"
  | "roboconf"
  | "robotframework"
  | "robot"
  | "ruby"
  | "rb"
  | "rust"
  | "sas"
  | "sass"
  | "scss"
  | "scala"
  | "scheme"
  | "shell-session"
  | "sh-session"
  | "shellsession"
  | "smali"
  | "smalltalk"
  | "smarty"
  | "sml"
  | "smlnj"
  | "solidity"
  | "sol"
  | "solution-file"
  | "sln"
  | "soy"
  | "sparql"
  | "rq"
  | "splunk-spl"
  | "sqf"
  | "sql"
  | "squirrel"
  | "stan"
  | "stata"
  | "iecst"
  | "stylus"
  | "supercollider"
  | "sclang"
  | "swift"
  | "systemd"
  | "t4-templating"
  | "t4-cs"
  | "t4"
  | "t4-vb"
  | "tap"
  | "tcl"
  | "tt2"
  | "textile"
  | "toml"
  | "tremor"
  | "trickle"
  | "troy"
  | "turtle"
  | "trig"
  | "twig"
  | "typescript"
  | "ts"
  | "typoscript"
  | "tsconfig"
  | "unrealscript"
  | "uscript"
  | "uc"
  | "uorazor"
  | "uri"
  | "url"
  | "v"
  | "vala"
  | "vbnet"
  | "velocity"
  | "verilog"
  | "vhdl"
  | "vim"
  | "visual-basic"
  | "vb"
  | "vba"
  | "warpscript"
  | "wasm"
  | "web-idl"
  | "webidl"
  | "wgsl"
  | "wiki"
  | "wolfram"
  | "mathematica"
  | "nb"
  | "wl"
  | "wren"
  | "xeora"
  | "xeoracube"
  | "xml-doc"
  | "xojo"
  | "xquery"
  | "yaml"
  | "yml"
  | "yang"
  | "zig";
