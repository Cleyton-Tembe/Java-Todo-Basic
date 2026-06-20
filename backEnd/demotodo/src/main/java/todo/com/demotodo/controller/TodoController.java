package todo.com.demotodo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import todo.com.demotodo.db.TodoRepo;
import todo.com.demotodo.model.Todo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoRepo todoRepository;

    public TodoController(TodoRepo todorepository) {
        this.todoRepository = todorepository;
    }

    @PostMapping("/new")
    public ResponseEntity<Todo> CreateTodo(@RequestBody Todo todo) {
        System.out.println("Cliente acedeu ao end point /new ");
        Todo newTodo = todoRepository.save(todo);

        return new ResponseEntity<>(newTodo, HttpStatus.CREATED);
    }

    @GetMapping("/todo")
    public ResponseEntity<List<Todo>> GetAllTodos() {
        
       List<Todo> allTodo = todoRepository.findAll();

       if(allTodo.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }

       return new ResponseEntity<>(allTodo,HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> GetTodoById(@PathVariable Long id) {

        Optional<Todo> dbTodo = todoRepository.findById(id);
        
        if (dbTodo.isPresent()) {

            return new ResponseEntity<>(dbTodo.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Todo> putMethodName(@PathVariable Long id, @RequestBody Todo todo) {
        System.out.println("descricao: "+id);
        Optional<Todo> dbTodo = todoRepository.findById(id);

        if (dbTodo.isPresent()) {
            Todo updateTodo = dbTodo.get();

            if (todo.getCompleted() != null) {
                updateTodo.setCompleted(todo.getCompleted());
                updateTodo.setUpdatedAt(LocalDateTime.now());
            }

            if (todo.getDescricao() != null) {
                updateTodo.setDescricao(todo.getDescricao());
                updateTodo.setUpdatedAt(LocalDateTime.now());
            }

            if (todo.getTitulo() != null) {
                updateTodo.setTitulo(todo.getTitulo());
                updateTodo.setUpdatedAt(LocalDateTime.now());
            }


            
            todoRepository.save(updateTodo);

            return new ResponseEntity<>(updateTodo, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> DeleteTodo(@PathVariable Long id) {

        Optional<Todo> dbuser = todoRepository.findById(id);

        if (!dbuser.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        todoRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<Void> DeleteAllTodos() {

        todoRepository.deleteAll();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
