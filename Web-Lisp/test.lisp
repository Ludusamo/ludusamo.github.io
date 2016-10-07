(load "~/quicklisp/setup.lisp")
(ql:quickload `(cl-who parenscript))

(defpackage :ludusamo
  (:use :cl :cl-who :parenscript))

(in-package :ludusamo)

(setf (html-mode) :html5)

(defmacro navigation-expand-button ()
  `(with-html-output (*standard-output* nil)
					 (:button :type "button" 
							  :class "navbar-toggle collapsed" 
							  :data-toggle "collapse"
							  :data-target "#navbar"
							  :aria-expanded "false" 
							  :aria-controls "navbar" 
							  (:span :class "sr-only" 
									 "Toggle navigation") 
							  (:span :class "icon-bar") 
							  (:span :class "icon-bar") 
							  (:span :class "icon-bar"))))

(defmacro navigation-bar ((&key brandname))
	`(with-html-output (*standard-output* nil)
					   (:nav :class "navbar navbar-inverse navbar-static-top" 
							 (:div :class "container"
								   (:div :class "navbar-header"  
										 (navigation-expand-button)
										 (:a :class "navbar-brand" :href "#" 
											 ,brandname)) 
								   (:div :id "navbar" :class "collapse navbar-collapse" 
										 (:ul :class "nav navbar-nav" 
											  (:li 
												(:a :href "#about" 
													"About")) 
											  (:li 
												(:a :href "#resume" 
													"Resume"))
											  (:li
												(:a :href "#blog"
													"Blog"))
											  (:li
												(:a :href "#contact"
													"Contact"))))))))

(defmacro include-stylesheet (path)
  `(with-html-output (*standard-output* nil)
					 (:link :type "text/css"
							:rel "stylesheet" 
							:href ,path)))

(defmacro include-script (path)
  `(with-html-output (*standard-output* nil)
					 (:script :src ,path)))

(defmacro standard-page ((&key title) &body body)
  `(with-html-output-to-string
	(*standard-output* nil :prologue t)
		(:html :lang "en"
		   (:head
			 (:meta :charset "utf-8")
			 (:meta :name "viewport" 
					:content "width=device-width, initial-scale=1")
			 (:title ,title))
		   (:body 
			 ,@body))))

(with-open-file (*standard-output* "index.html"
					 :direction :output
					 :if-exists :supersede
					 :if-does-not-exist :create)
  (format t "~a" 
		  (standard-page (:title "Ludusamo") 
						 (:div :id "web-header" :class "bottom-buffer"
							   (navigation-bar (:brandname "Ludusamo"))
							   (:div :class "container-fluid"
									 (:div :class "row top-buffer"
										   (:img :src "res/logo.png"
												 :alt "Logo"
												 :class "img-responsive center-block"))
									 (:div :class "row"
										   (:div :class "text-center" :id "brand-name"
												 "Ludusamo"))
									 (:div :class "row bottom-buffer"
										   (:div :class "text-center" :id "brand-subtitle"
												 "Alias of Brendan Horng"))
									 (:div :class "row bottom-buffer"
										   (:button :type "button" :class "btn btn-default center-block"
													(:span :class "glyphicon glyphicon-triangle-bottom")))))
						 (include-stylesheet "css/bootstrap.min.css")
						 (include-stylesheet "css/bootstrap-theme.min.css")	
						 (include-stylesheet "css/style.css")
						 (include-script "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js")	
						 (include-script "js/bootstrap.min.js"))))
