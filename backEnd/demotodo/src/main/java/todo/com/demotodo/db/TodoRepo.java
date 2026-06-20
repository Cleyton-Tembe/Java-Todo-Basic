package todo.com.demotodo.db;

import org.springframework.data.jpa.repository.JpaRepository;

import todo.com.demotodo.model.Todo;

public interface TodoRepo extends JpaRepository<Todo, Long> {

} 