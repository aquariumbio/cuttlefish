FROM node
 
ENV NODE_VERSION stable
ENV NPM_SCRIPT start
ENV GIT_URL https://github.com/klavinslab/project-dashboard
ENV APP_PORT 3000
 
ENV APP_HOME .
ENV APP_STARTUP ""
# JUST_RUN specifies whether node should be installed and git should be cloned
ENV JUST_RUN N

COPY . /projectdashboard
 
WORKDIR /projectdashboard
 
#RUN chown -R app:app /code/*
RUN chmod +x /projectdashboard/bootstrap.sh
 
RUN npm install -g n --silent
RUN n stable
 
ENTRYPOINT ["/projectdashboard/bootstrap.sh"]