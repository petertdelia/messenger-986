# Currently, our app only allows conversations between two users. We would like to allow conversations with groups of 3 or more users. 

## db models to change:
- conversation - currently has user1, user2
- convert user - conversation relationship to be a many-to-many relationship
- message - read status
  - Modified from boolean to a string, so that we can store a list of ids - the users who have read the message.
## Other changes
- Backend
  - change the logic of the conversations route so that it gets all conversations involving that user by using the join table.
  - the conversations should return a list of otherUsers that are part of each conversation, rather than a single otherUser
  - the logic of posting and putting messages needs to be modified so that the 'read' property becomes a 'readBy' property that contains the ids of the users who have read that message.
- Frontend
  - We need to keep track of all of the other users who are part of a conversation, so the 'otherUser' property of a conversation might become 'otherUsers', an array of users.


## If our app were already deployed, what steps would we need to take to move to this new feature without disrupting service for current users

- We would want to perform a schema migration, so that we can keep a record of the old schema and be able to roll back to it if we want.
- We would also want to perform a data migration, so that the user ids that are currently stored on the conversations table would be moved to the usersConversations join table
  - Sequelize has a schema migration tool that we could use
- We would want to thoroughly test any schema migration on local database before we attempt it on the production database
- we might want to implement a transition phase, in which the application code supports the old schema and the new schema at the same time. Another option would be to use feature flags, where we could have the new code implemented and tested, and we could switch over to the new features.